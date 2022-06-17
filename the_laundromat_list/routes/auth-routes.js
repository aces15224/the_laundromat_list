const express = require('express');
const router = express.Router();
const db = require("../models");
const passport = require('passport');

router.get('/login', (req, res)=>{
    res.render('login')
});

router.get('/logout', (req, res)=>{
    res.send("Log out page")
});

router.post('/login', (req, res, next) => {
    console.log(req.body)
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/login',
    })(req, res, next);
});

module.exports = router;