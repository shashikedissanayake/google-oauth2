const router = require('express').Router();
const jwt = require('jsonwebtoken');

const keys = require('../config/keys.json');
const User = require('../models/user-model');

const verifyJwt = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.json({
            code: 401,
            message: 'unauthorized',
        });
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.replace(/Bearer /g, '');
        jwt.verify(token, keys.jwtSecret.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    code: 401,
                    message: 'unauthorized',
                    error: err.message,
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.json({
            code: 401,
            message: 'unauthorized',
        });
    }
}

router.get('/:id', verifyJwt, (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (user) {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    googleID: user.googleId, 
                },
            });
        } else {
            res.json({
                code: 422,
                message: 'user not found',
            });
        }
    }).catch((error) => {
        res.json({
            code: 500,
            message: 'Server error',
            error: error.message,
        });
    });
});


module.exports = router;