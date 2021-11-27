const express = require("express");
const Router = express.Router();

Router.get("/", (req, res)=>{
    console.log("Hello")
    console.log(req.path)
    res.json({"Hello": "Hello"})
})

module.exports = Router;