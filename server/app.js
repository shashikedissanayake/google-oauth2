const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const authRouter = require('./routes/auth.routes');
const profileRouter = require('./routes/profile.routes');
const keys = require('./config/keys.json');
const passportSetup = require('./config/passport-setup');


const app = express();
const port = 3001;

app.use(cors());

// Use passport setup
app.use(passport.initialize())

// Configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setup mongoose
mongoose.connect(keys.mongodb.dbURI, (error) => {
    if (error) {
        console.error(error.message);
    } else {
        console.log('Connected to DB');
    }
});

// Set up routes
app.get('/', (req, res) => {
    res.json({
        code: 200,
        message: 'Success',
    });
});
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});