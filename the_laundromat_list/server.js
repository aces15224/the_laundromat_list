const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json())

// const api_routes = require("./routes/api_routes");



app.get("/api", (req, res)=>{
    console.log("api")
    res.json("Hello")
})
app.get("/", (req, res)=>{
    res.end()
})



app.listen(PORT, ()=>{
    console.log("Listnin")
})