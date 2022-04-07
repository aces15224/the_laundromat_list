const express = require("express");
const db = require('./models');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

// const api_routes = require("./routes/api_routes");



db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log('App listening on PORT ' + PORT);
    });
});