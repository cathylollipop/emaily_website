const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// can't use require here, only require once in index.js or mongoose will confuse and thinks you are requiring the same model class multiple times
const User = mongoose.model('users');

// take a user model and call serializeUser with the user to generate the identifying piece of info and then passport will stuff that with a cookie
passport.serializeUser((user, done) => { // user is user mondel instance
    done(null, user.id); // this id is the unique identifier generated by mongo - every user has a id automatically generated by mongo. and id is shortcut for mongo _id.$oid
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// passport.use(
//     new GoogleStrategy({
//             clientID: keys.googleClientID,
//             clientSecret: keys.googleClientSecret,
//             callbackURL: '/auth/google/callback', // use relative path
//             proxy: true // make google strategy trust proxy and not to change https to http and gives an error
//         },
//         (accessToken, refreshToken, profile, done) => {
//             // initiates a query to see if the DB has this profile already
//             User.findOne({ googleId: profile.id }) //return a promise
//                 .then((existingUser) => {
//                     if(existingUser){
//                         // we already have a record with the given profile ID
//                         done(null, existingUser); // first arg is error function - null means no error, second arg is the returned user
//                     }else{
//                         // we don't have a user record with this ID, make a new record
//                         new User({
//                             googleId: profile.id
//                         }).save() // save function automatically takes the info and save in record
//                             .then(user => done(null, user)); // take the just saved user and call done - make sure done function is called after new user is saved successfully
//                     }
//                 });
//         }
//     )
// );

// refactor by using async and await syntax
passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if(existingUser){
                return done(null, existingUser);
            }

            const user = await new User({ googleId: profile.id }).save();
            done(null, user);
        }
    )
);