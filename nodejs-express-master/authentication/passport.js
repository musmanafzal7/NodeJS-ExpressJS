require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require("../database/models");

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  function(username, password, done) {
    models.User.findOne({ where: { email: username }}).then(function(user){
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    }).catch(function(err){
      return done(err); 
    });
  }
));

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    models.User.findOne({where: {id: jwt_payload.id}})
    .then( function(user){
        if(!user){
          return done(null, false);
        }
        return done(null, user);
    })
    .catch(function(err){
        return done(err, false);
    });
}));

module.exports = {
  passport
}