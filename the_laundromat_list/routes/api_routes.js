
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
    // limits:{fileSize: 100000},
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
Router.post("/uploads/:name/:prevFile", upload.single('uploaded_file'), async (req, res)=>{
    const {name, prevFile} = req.params;
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
                //delete previous profile pic
                fs.unlinkSync(path.resolve(req.file.destination,'resized', prevFile));
                res.json(data);
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

//Route Chain for User information
Router.route("/users/:businessName")
.get((req, res)=>{
    //Get user information using their businessName
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
.put((req,res)=>{
    //update user information
    const {businessName} = req.params;
    //remove non-letters from businessName
    const establishmentName = businessName.split("%20").join(" ");
    const {firstName, lastName, phone, email} = req.body;
    db.BusinessUser.update({
        firstName,
        lastName,
        phone,
        email
    },{
        where:{
            businessName : establishmentName
        }
    })
    .then(function(data){
        res.json(data)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//Route for creating new user or verifying user doesn't already exist
Router.post("/users", (req, res) =>{
    let email = req.body.email;
    const body = Object.keys(req.body);
    const user = {
        email,
        businessAddress: req.body.businessAddress,
        businessName: req.body.businessName,
        businessPhone: req.body.businessPhone,
        phone: req.body.phone, 
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        EstablishmentBusinessName: req.body.EstablishmentBusinessName
    }
    //If body.includes(firstName) the user is submitting user info to database and...
    if(body.includes('firstName')){
        //creating a user.  A new password must be encypted...
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              //and the user will be added to the database
              db.BusinessUser.create(user)
                .then(function(data){
                    res.json(data)
                }) 
                .catch(err => console.log(err));

            });
        });
    } else{
        // If !body.includes(firstName) the user is checking database for existing user info
        db.BusinessUser.findOne({
            where:{
                email : email
            }
        })
        .then(function(results) {
            if(results){
                console.log("Email Already Taken")
            }
            //send results back and check for errors
            res.json(results)
        })
        .catch(err => console.log(err))    
    }    
});

//Route for getting or updating info on an individual business
Router.route("/:name")
.get(async (req,res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const businessName = name.split("%20").join(" ");
    //find one business and include all price lists and popular times
    await db.Establishment.findOne({
        where:{
            businessName : businessName
        },
        include:[db.LaundryPrices, db.DeliveryPrices, db.DryCleaningPrices, db.DropOffPrices, db.PopularTimes]
        
    })
    .then(function(results) {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
.put((req,res)=>{
    //Submit handler for two forms.  Both update info for a single business 
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    //Check req.body for key: wifi.  If included, this is submitting info from the Overview component
    if(Object.keys(req.body).includes("wifi")){
        const {wifi, card, atm, dropOff, delivery, dryCleaning, options, supplies, overview, entertainment} = req.body;
        console.log("Options updated")
        db.Establishment.update({
            wifi,
            card,
            atm,
            dropOff,
            delivery,
            dryCleaning,
            options, 
            supplies,
            overview,
            entertainment
        },{
            where:{
                businessName : establishmentName
            }
        })
        .then(function(data){
            res.json(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        }); 

    } else{
        // If !req.body.includes("wifi") this route is submitting info from DashboardBusinessInfo
        const {businessName, businessAddress, businessHours, businessLocation, categoryName, phone, website, zip, city} = req.body;
        db.Establishment.update({
            businessName,
            businessAddress,
            businessHours,
            businessLocation,
            categoryName,
            phone,
            website,
            zip,
            city
        },{
            where:{
                businessName : establishmentName
            }
        })
        .then(function(data){
            res.json(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });    
    }  
});

//Route for creating a price list for Laundry
Router.post("/laundry-prices", (req, res)=>{
    db.LaundryPrices.create(req.body)
    .then(function(data){
        res.json(data)
    })  
})

//Route for getting and updating laundry prices for an individual business
Router.route("/laundry-prices/:name")
.get((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.LaundryPrices.findOne({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
.put((req, res)=>{
    const {name} = req.params;
    const {
        laundryAddInfo,
        washerSingle,
        washerDouble,
        washerTriple,
        washerFour,
        washerFive,
        washerSix,
        washerSeven,
        washerEight,
        washerOptional1,
        washerOptional2,
        washerOptional3,
        dryerRate1,
        dryerRate2,
        dryerRate3,
        dryerRate4,
        dryerRate5,
        dryerRate6,
        dryerRate7 
    } = req.body;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.LaundryPrices.update({
        laundryAddInfo,
        washerSingle,
        washerDouble,
        washerTriple,
        washerFour,
        washerFive,
        washerSix,
        washerSeven,
        washerEight,
        washerOptional1,
        washerOptional2,
        washerOptional3,
        dryerRate1,
        dryerRate2,
        dryerRate3,
        dryerRate4,
        dryerRate5,
        dryerRate6,
        dryerRate7       
    },{
        where:{
            EstablishmentBusinessName : establishmentName
        }
    })
    .then(function(data){
        res.json(data)
    }) 
    .catch(err => console.log(err));  
});

//Route for creating a price list for Dry Cleaning
Router.post("/dry-cleaning-prices", (req, res)=>{
    db.DryCleaningPrices.create(req.body)
    .then(function(data){
        res.json(data)
    })  
})

//Route for getting, updating, and deleting dry cleaning prices for an individual business
Router.route("/dry-cleaning-prices/:name")
.get((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DryCleaningPrices.findOne({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
.put((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    const {
        sameDayService, 
        delivery,
        pickUpFee,
        freePickUp,
        deliveryOrderMinimum,
        dryCleaningPrices,
        dryCleaningPrices2,
        dryCleaningPrices3,
        dryCleaningPrices4,
        dryCleaningPrices5,
        dryCleaningPrices6,
        dryCleaningPrices7,
        dryCleaningPrices8,
        dryCleaningPrices9,
        dryCleaningPrices10,
        dryCleaningPrices11,
        dryCleaningPrices12,
        dryCleaningPrices13,
        dryCleaningPrices14,
        dryCleaningPrices15,
        dryCleaningPrices16,
        dryCleaningPrices17,
        dryCleaningPrices18,
        dryCleaningPrices19,
        dryCleaningPrices20,
        dryCleaningPrices21,
        dryCleaningPrices22,
        dryCleaningPrices23,
        dryCleaningPrices24,
        dryCleaningPrices25,
        dryCleaningPrices26,
        dryCleaningPrices27,
        dryCleaningPrices28,
        dryCleaningPrices29,
        dryCleaningPrices30,
        addInfo,
        addInfo2,
        addInfo3,
        sameDayInfo,
        deliveryHours,
        pickUpHours
    } = req.body;
    db.DryCleaningPrices.update({
        sameDayService, 
        delivery,
        pickUpFee,
        freePickUp,
        deliveryOrderMinimum,
        dryCleaningPrices,
        dryCleaningPrices2,
        dryCleaningPrices3,
        dryCleaningPrices4,
        dryCleaningPrices5,
        dryCleaningPrices6,
        dryCleaningPrices7,
        dryCleaningPrices8,
        dryCleaningPrices9,
        dryCleaningPrices10,
        dryCleaningPrices11,
        dryCleaningPrices12,
        dryCleaningPrices13,
        dryCleaningPrices14,
        dryCleaningPrices15,
        dryCleaningPrices16,
        dryCleaningPrices17,
        dryCleaningPrices18,
        dryCleaningPrices19,
        dryCleaningPrices20,
        dryCleaningPrices21,
        dryCleaningPrices22,
        dryCleaningPrices23,
        dryCleaningPrices24,
        dryCleaningPrices25,
        dryCleaningPrices26,
        dryCleaningPrices27,
        dryCleaningPrices28,
        dryCleaningPrices29,
        dryCleaningPrices30,
        addInfo,
        addInfo2,
        addInfo3,
        sameDayInfo,
        deliveryHours,
        pickUpHours   
    },{
        where:{
            EstablishmentBusinessName : establishmentName
        }
    })
    .then(function(data){
        res.json(data)
    }) 
    .catch(err => console.log(err));  
})
.delete((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DropOffPrices.destroy({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        console.log("Prices Deleted")
        const {name} = req.params;
        //remove non-letters from name
        const establishmentName = name.split("%20").join(" ");
        //after deleting price, the business table must be updated to reflect changes. ("Dry Cleaning Offered: False")
        db.Establishment.update({
            dryCleaning: false
        },{
            where:{
                businessName : establishmentName
            }
        })
        .then(function(data){
            console.log("Service Removed")
            res.json(data)        
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//Route for creating a price list for Drop Off Service
Router.post("/drop-off-prices", (req, res)=>{
    db.DropOffPrices.create(req.body)
    .then(function(data){
        res.json(data)
    })  
})

//Route for getting, updating, and deleting drop off prices for an individual business
Router.route("/drop-off-prices/:name")
.get((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DropOffPrices.findOne({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
.put((req, res)=>{
    const {name} = req.params;
    console.log(req.body)
    const {
        dropOffPriceMinimum,
        dropOffPricePerLb,
        dropOffPrices,
        dropOffPrices2,
        dropOffPrices3,
        dropOffPrices4,
        dropOffPrices5,
        dropOffPrices6,
        dropOffPrices7,
        dropOffPrices8,
        dropOffPrices9,
        dropOffPrices10,
        dropOffPrices11,
        dropOffPrices12,
        dropOffPrices13,
        dropOffPrices14,
        dropOffPrices15,
        dropOffAddInfo,
        dropOffAddInfo2,
        sameDayService,
        sameDayInfo,
    } = req.body;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DropOffPrices.update({
        dropOffPriceMinimum,
        dropOffPricePerLb,
        dropOffPrices,
        dropOffPrices2,
        dropOffPrices3,
        dropOffPrices4,
        dropOffPrices5,
        dropOffPrices6,
        dropOffPrices7,
        dropOffPrices8,
        dropOffPrices9,
        dropOffPrices10,
        dropOffPrices11,
        dropOffPrices12,
        dropOffPrices13,
        dropOffPrices14,
        dropOffPrices15,
        dropOffAddInfo,
        dropOffAddInfo2,
        sameDayService,
        sameDayInfo,
    },{
        where:{
            EstablishmentBusinessName : establishmentName
        }
    })
    .then(function(data){
        res.json(data)
    }) 
    .catch(err => console.log(err));  
})
.delete((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DropOffPrices.destroy({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        console.log("Prices Deleted")
        const {name} = req.params;
        //remove non-letters from name
        const establishmentName = name.split("%20").join(" ");
        //after deleting price, the business table must be updated to reflect changes. ("Drop Off Offered: False")
        db.Establishment.update({
            dropOff: false
        },{
            where:{
                businessName : establishmentName
            }
        })
        .then(function(data){
            console.log("Service Removed")
            res.json(data)        
        })
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//Route for creating a price list for Delivery Service
Router.post("/delivery-prices", (req, res)=>{
    db.DeliveryPrices.create(req.body)
    .then(function(data){
        res.json(data)
    })  
});

//Route for getting, updating, and deleting delivery prices for an individual business
Router.route("/delivery-prices/:name")
.get((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DeliveryPrices.findOne({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})
.put((req, res)=>{
    const {name} = req.params;
    const {
        deliveryAddInfo,
        deliveryAddInfo2,
        deliveryAddInfo3,
        deliveryHours,
        deliveryPricePerLbs,
        deliveryPricePerLbsDiscounted,
        freePickUp,
        pickUpFee,
        pickUpHours,
        pickUpMinimum,
        deliveryPrices1,
        deliveryPrices2,
        deliveryPrices3,
        deliveryPrices4,
        deliveryPrices5,
        deliveryPrices6,
        deliveryPrices7,
        deliveryPrices8,
        deliveryPrices9,
        deliveryPrices10,
        deliveryPrices11,
        deliveryPrices12,
        sameDayInfo,
        sameDayService
    } = req.body;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DeliveryPrices.update({
        deliveryAddInfo,
        deliveryAddInfo2,
        deliveryAddInfo3,
        deliveryHours,
        deliveryPricePerLbs,
        deliveryPricePerLbsDiscounted,
        freePickUp,
        pickUpFee,
        pickUpHours,
        pickUpMinimum,
        deliveryPrices1,
        deliveryPrices2,
        deliveryPrices3,
        deliveryPrices4,
        deliveryPrices5,
        deliveryPrices6,
        deliveryPrices7,
        deliveryPrices8,
        deliveryPrices9,
        deliveryPrices10,
        deliveryPrices11,
        deliveryPrices12,
        sameDayInfo,
        sameDayService     
    },{
        where:{
            EstablishmentBusinessName : establishmentName
        }
    })
    .then(function(data){
        res.json(data)
    }) 
    .catch(err => console.log(err));  
})
.delete((req, res)=>{
    const {name} = req.params;
    //remove non-letters from name
    const establishmentName = name.split("%20").join(" ");
    db.DropOffPrices.destroy({
        where:{
            EstablishmentBusinessName : establishmentName
        }        
    })
    .then(function(results) {
        console.log("Prices Deleted")
        const {name} = req.params;
        //remove non-letters from name
        const establishmentName = name.split("%20").join(" ");
        //after deleting price, the business table must be updated to reflect changes. ("Delivery Offered: False")
        db.Establishment.update({
            delivery: false
        },{
            where:{
                businessName : establishmentName
            }
        })
        .then(function(data){
            console.log("Service Removed")
            res.json(data)
        })    
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

//Route for creating a Popular Times Table
Router.post("/popular-times", (req, res)=>{
    db.DeliveryPrices.create(req.body)
    .then(function(data){
        res.json(data)
    })  
})

//Route for getting business info (laundry price & popular times) for ALL businesses
Router.get("/", (req, res)=>{
    db.Establishment.findAll({include:[db.LaundryPrices, db.PopularTimes]}).then(function(establishment) {
        res.json(establishment);
    })  
})

//Route for updating prices for an individual business (!!consider adding to /:name !!)
Router.put("/establishment/:name/", (req, res)=>{
    const {name} = req.params;
    const {dropOff, delivery, dryCleaning} = req.body;
    db.Establishment.update({dropOff, delivery, dryCleaning},{
        where:{
            businessName: name
        }
    })
    .then(function(data){
        res.json(data)
    }) 
    .catch(err => console.log(err));               
})

// Route for adding a business to the database
Router.post("/establishment", (req, res)=>{
    db.Establishment.create(req.body).then(function(establishment) {
        res.json(establishment)
    }) 
})

module.exports = Router;