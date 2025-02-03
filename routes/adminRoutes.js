const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, getAllUsers, createUser, updateUser, deleteUser } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware'); // Admin authentication middleware

// Admin Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/all-users', verifyAdmin, getAllUsers);
router.post('/create-user', verifyAdmin, createUser);
router.put('/update-user/:userId', verifyAdmin, updateUser);  // Update user
router.delete('/delete-user/:userId', verifyAdmin, deleteUser);  // Delete user

module.exports = router;
