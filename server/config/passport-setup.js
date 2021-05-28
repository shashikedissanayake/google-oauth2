const { json } = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys.json');
const User = require('../models/user-model');

passport.use(new GoogleStrategy({
    // Config
    clientID: keys.googleOauth.clientID,
    clientSecret: keys.googleOauth.clientSecret,
    callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
    .then((currentUser) => {
        if (!currentUser) {
            new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
            }).save().then((newUser) => {
                return done(null, newUser);
            }).catch((error) => {
                console.error(error.message);
                return done(error, null);
            });
        } else {
            return done(null, currentUser);
        }
    })
    .catch((error) => {
        return done(error, null);
    })
}));