const express = require('express');
const {addAccountDetails, getAccountDetails , updateAccountDetails }= require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware,addAccountDetails);
router.get('/', authMiddleware, getAccountDetails);
router.put('/', authMiddleware, updateAccountDetails);



module.exports = router;