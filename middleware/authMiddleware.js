const jwt = require('../config/jwt');

// Middleware to verify user authentication
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const tokenValue = token.split(' ')[1]; // Extract token after "Bearer"
        const verified = jwt.verifyToken(tokenValue); // Verify token
        req.user = verified; // Attach verified user payload
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Middleware to verify admin privileges
module.exports.verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const tokenValue = token.split(' ')[1]; // Extract token after "Bearer"
        const verified = jwt.verifyToken(tokenValue); // Verify token

        // Check for admin privileges
        if (verified.role !== 'admin') {
            return res.status(403).json({ message: 'Access Denied: Admins only.' });
        }

        req.user = verified; // Attach verified user payload
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
