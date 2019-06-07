var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");

/*
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
*/

var app = express();

app.use(cors({origin: true}));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes.js')(app);

var server = app.listen(3001, function () {
    console.log("Listening on port %s...", server.address().port);
});