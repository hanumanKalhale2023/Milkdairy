const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

//getting all the methods from the attendance controller
const { addAttendance, getAttendance, updateMilkQuantity, customizeMilkUpdate , updateMilkForTomorrow } = require('../controllers/attendanceController');
const router = express.Router();

router.post('/', authMiddleware, addAttendance); // Protected route
router.get('/', authMiddleware, getAttendance);// Protected route
router.put('/:id', authMiddleware,updateMilkQuantity);// Protected route
router.patch('/:id/customize', authMiddleware , customizeMilkUpdate);// Protected route
router.patch('/update-milk-for-tomorrow/:id',authMiddleware ,updateMilkForTomorrow);// Protected route

module.exports = router;
