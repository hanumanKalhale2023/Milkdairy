const User = require('../models/User');
const jwt = require('../config/jwt');
const bcrypt = require('bcryptjs');


//user registration
exports.signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Encoding the password
        const user = new User({ userName, email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error });
    }
};
//user login
exports.login = async (req, res) => {
    try {
        //get user data from request body
        const { email, password } = req.body;
        //find user by email it is present in database or not
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
        //bcrypt password and check it is valid by maching the password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

        //if password matches then generate the token and return
        const token = jwt.generateToken({ id: user._id });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};
