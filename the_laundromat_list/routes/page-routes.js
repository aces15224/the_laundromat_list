const express = require("express");
const Router = express.Router();
// const db = require("../models");

Router.get("/", (req, res)=>{
    res.end();
})

Router.get("/login", (req, res)=>{
    res.end();
})

Router.get("/sign-up", (req, res)=>{
    res.end();
})

Router.get("/about", (req, res)=>{
    console.log("about")
    res.end();
})

Router.get("/contact", (req, res)=>{
    console.log("contact")
    res.end();
})

Router.get("/dashboard", (req, res)=>{
    res.end()
})

Router.get("/business", (req, res)=>{
    res.end()
})

Router.get("business/laundromat/:businessName", (req, res)=>{
    res.end();
})

Router.get("/:category/:zipCode", (req, res)=>{
    const {category, zipCode} = req.params;
    console.log(category)
    console.log(zipCode)
    res.end()
})



module.exports = Router;