const express =  require('express');
const {addProfile, getProfile , updateProfile} = require('../controllers/ProfileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// profile routes
router.post('/', authMiddleware, addProfile);
router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, updateProfile);


module.exports = router;