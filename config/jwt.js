const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET; //assigning the secret key

module.exports = {
    generateToken: (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' }),
    verifyToken: (token) => jwt.verify(token, SECRET_KEY), // This is the function you're using
};
