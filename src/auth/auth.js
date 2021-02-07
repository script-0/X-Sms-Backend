'use strict';

var passport = require('passport');
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/user.js")

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    function (login, password, done) {
      User.find(login, password, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect login or password." });
        }
        return done(null, user.id);
      })
    }
  ));

  // tell passport how to serialize the user
passport.serializeUser((user, done) => {
  //Serialize just the id
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false; 
  done(null, user);
});

}