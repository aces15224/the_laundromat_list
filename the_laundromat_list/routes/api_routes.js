
//Express to set up routing
const express = require("express");
const Router = express.Router();
//Multer for uploading image file
const multer = require('multer');
//Sharp for reformatting and resizing images
const sharp = require('sharp');
//FS and Path modules for configuring directories and deleting files
const fs = require('fs');
const path = require('path');
//Import database models
const db = require("../models");
//Bcyrpt library used for encrypting passwords
const bcrypt = require('bcryptjs');
//Passport library and configuration (used for Authentication)
const passport = require('passport');
const initializePassport = require('../config/passport');
//UploadedFile stores a temporary file name for Multer
var uploadedFile = "";

//Multer disk storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb){
        uploadedFile = file.fieldname + '-' + Date.now() + path.extname(file.originalname);

        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

//Multer Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 100000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
});

//Check Uploaded File for valid extentions and mimetypes
function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    } else {
      console.log('Error: Images Only!');
    }
};

//Intialize passport.  Find user's email.
initializePassport(
  passport,
  email => db.BusinessUser.findOne({ where:{ email: email }})
);

//CheckAuth checks if there is user and sets user to the user's businessName
//This will be called when the user visits pages that require authentication
Router.get("/checkAuthentication", (req, res) => {
    const authenticated= typeof req.user !== 'undefined'
    if(authenticated){
        console.log("user =>")
        const user = req.user.dataValues.businessName;
        res.json({authenticated, user})    
    } else{
        res.json({authenticated})
    }
});

//Multer Post Route
//Uses business name to post file to public folder
Router.post("/uploads/:name", upload.single('uploaded_file'), async (req, res)=>{
    const {name} = req.params;
    //Take all non-letters out of name
    const establishmentName = name.split("%20").join(" ");
    //if no file, console log error
    if(req.file === undefined){
        console.log('Error: No File Selected!')
    } else {
        //else, destructure image and reformat to a png file with sharp
        const { filename: image } = req.file;
        await sharp(req.file.path)
        .toFormat("png")
        .resize(500, 500)
        .png({ quality: 90 })
        //save file to resized folder and unlink the original file with FS
        .toFile(
            path.resolve(req.file.destination,'resized',image)
        ).then(() => {
            fs.unlinkSync(req.file.path);
            //update database w/ new image
            db.Establishment.update({
                imageUrl: uploadedFile  
            },{
                where:{
                    businessName: establishmentName
                }
            })
            .then(function(data){
                res.json(data)
            }) 
            .catch(err => console.log(err));    
        })
        .catch((err) => console.warn(err));               
    } 
});

//Check user password to confirm user has permission to change password
Router.post('/password', (req, res)=>{
    const password = req.body.password;
    const businessName = req.body.EstablishmentBusinessName
    //find user using business name
    db.BusinessUser.findOne({
        where:{
            EstablishmentBusinessName : businessName
        }
    })
    .then(function(data){
        // if user exists compare typed passsword w/ encrypted password stored in database
        if(data){
            bcrypt.compare(password, data.password, (err, password)=>{
                if (err) {console.log(err)}
                if (password) {
                    res.json(password) 
                } else {
                   res.json(password)  
                }
            });
        }
        else{
            return false;
        }   
    }) 
    .catch(err => console.log(err));   
});

//Update Password when changed by user
Router.put('/password', (req, res)=>{
    let password = req.body.password;
    const businessName = req.body.EstablishmentBusinessName;
    //encrypt password and update the database w/ new password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            console.log(hash)
            password = hash;
            db.BusinessUser.update({
                password: password
            },{
                where:{
                    EstablishmentBusinessName : businessName
                }
            })
            .then(function(data){
                res.json(data)
            }) 
            .catch(err => console.log(err));  
        });
    });  
});

//Log user out and destroy session
Router.get("/logout", (req, res)=>{
    req.session.destroy(function (err) {
        //Redirect to login page after logging out
        res.redirect('/login');
    });
});

// Check Password for Login Authentication
Router.post('/login', async (req, res, next) => {
    let email = req.body.email;
    //Find user with email provided in req.body...
    const user = db.BusinessUser.findOne({
        where:{
            email : email
        }
    })
    await user
    .then(data => {
        //call passport authentication and...
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { 
                //if no user, redirect to the login page
                console.log("fail")
                return res.redirect('/login'); 
            }
            //otherwise log the user in and redirect them to their dashboard
            req.logIn(user, function(err) {
                console.log("success")
                if (err) { 
                  console.log("err")
                  return next(err); 
                }
                console.log("redirect")
              return res.redirect(`/business/dashboard/${data.dataValues.businessName}`);
            });
        })(req, res, next)
    })
    .catch(err => console.log(err));    
});

//Get user information using their businessName
Router.get("/users/:businessName", (req, res)=>{
    const {businessName} = req.params;
    //remove non-letters from businessName
    const establishment = businessName.split("%20").join(" ");
    db.BusinessUser.findOne({
        where:{
            EstablishmentBusinessName : establishment
        }        
    })
    .then(function(results) {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})


module.exports = Router;