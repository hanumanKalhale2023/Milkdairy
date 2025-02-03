const express = require('express');
const {addDailyEntry , getDailyEntry , updateDailyEntry}= require('../controllers/dailyEntryController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// daily entry routes
router.post('/daily-entry', verifyAdmin, addDailyEntry);
router.get('/daily-entry', verifyAdmin, getDailyEntry);
router.put('/daily-entry/:dailyEntryId', verifyAdmin, updateDailyEntry);

module.exports = router;
