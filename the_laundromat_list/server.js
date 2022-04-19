const express = require('express');
const db = require('./models');
const PORT = process.env.PORT || 8080;
const passport = require('passport');
const session = require('express-session');
const app = express();

//passport configuration
require('./config/passport')(passport);
//evironmental variables
require('dotenv').config()
//route references
const apiRoutes = require("./routes/api-routes");
const pageRoutes = require("./routes/page-routes");
const authRoutes = require('./routes/auth-routes');

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));
app.use(express.json());
//session and passport middleware
app.use(
  session({
    secret: process.env.REACT_APP_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());


//routes to be used in app
app.use("/api", apiRoutes);
app.use('/auth', authRoutes);
app.use(pageRoutes)

//initialize sequelize and listen to port
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});