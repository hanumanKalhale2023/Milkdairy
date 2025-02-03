const express  = require('express');
const {addAddress, getAddress, updateAddress} = require('../controllers/addressController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addAddress);
router.get('/', authMiddleware, getAddress);
router.patch('/', authMiddleware,updateAddress);
router.put('/', authMiddleware, updateAddress);


module.exports = router;