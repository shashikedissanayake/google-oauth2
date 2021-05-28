const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.json');

// Google login
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
    if (req.user) {
        const token = jwt.sign({ id: req.user.id, email: req.user.email }, keys.jwtSecret.secret, { expiresIn: '1d'});
        res.json({
            code: 200,
            message: 'Success',
            data: {
                token,
                userId: req.user.id,
                userName: req.user.name,
            }
        });
    } else {
        res.json({
            code: 422,
            message: 'Login failed',
        });
    }
    
});



module.exports = router;