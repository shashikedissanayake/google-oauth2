const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.json');
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(keys.googleOauth.clientID);
// const User = require('../models/user-model'); 

// Google login
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
    if (req.user) {
        const token = jwt.sign({ id: req.user.id, email: req.user.email }, keys.jwtSecret.secret, { expiresIn: '1d'});
        res.redirect('http://localhost:3000?token='+token);
    } else {
        res.redirect('http://localhost:3000');
    }
});

// Route for get Google token from client and create Json token if Google access token valid
// router.get('/google/:token', async (req, res) => {
//     console.log(req.params.token)

//     const ticket = await client.verifyIdToken({
//         idToken: req.params.token,
//         audience: keys.googleOauth.clientID,
//     });
//     console.log(ticket);
//     if (ticket) {
//         User.findOne({ googleId: ticket.payload.sub })
//         .then((currentUser) => {
//             if (!currentUser) {
//                 new User({
//                     name: ticket.payload.name,
//                     email: ticket.payload.email,
//                     googleId: ticket.payload.sub,
//                 }).save().then((newUser) => {
//                     const token = jwt.sign({ id: newUser.id, email: newUser.email }, keys.jwtSecret.secret, { expiresIn: '1d'});
//                     res.json({
//                         code: 200,
//                         message: 'Success',
//                         data: {
//                             token,
//                             userId: newUser.id,
//                             userName: newUser.name,
//                         }
//                     });
//                 }).catch((error) => {
//                     console.error(error.message);
//                     return done(error, null);
//                 });
//             } else {
//                 const token = jwt.sign({ id: currentUser.id, email: currentUser.email }, keys.jwtSecret.secret, { expiresIn: '1d'});
//                 res.json({
//                     code: 200,
//                     message: 'Success',
//                     data: {
//                         token,
//                         userId: currentUser.id,
//                         userName: currentUser.name,
//                     }
//                 });
//             }
//         })
//         .catch((error) => {
//             res.json({
//                 code: 500,
//                 message: 'server error',
//             });
//         })
//     } else {
//         res.json({
//             code: 422,
//             message: 'Login failed',
//         });
//     }
// });



module.exports = router;