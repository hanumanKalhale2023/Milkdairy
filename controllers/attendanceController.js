const Attendance = require('../models/Attendance');

//add the attendance for milk 
exports.addAttendance = async (req, res) => {
    try {
        const { userId, date, attendance, quantity } = req.body;

        const newAttendance = new Attendance({
            userId,
            date,
            attendance,
            quantity
        });

        await newAttendance.save();
        res.status(201).json({ message: 'Attendance added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding attendance', error });
    }
};
//get the attendace for milk
exports.getAttendance = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from the token
        const attendanceRecords = await Attendance.find({ userId }); // Filter by userId
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

//update the milk quantity 
exports.updateMilkQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        // Find the attendance record
        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Check if the logged-in user is the owner of this record
        if (attendance.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this record' });
        }

        // Update the quantity
        attendance.quantity = quantity;
        await attendance.save();

        res.status(200).json({ message: 'Milk quantity updated successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Error updating milk quantity', error });
    }
};

//customize the days for getting milk quantity
exports.customizeMilkUpdate = async (req, res) => {
    try {
        const { id } = req.params; // Attendance record ID
        const { date, updatedDate } = req.body; // Customization details

        // Validate input dates
        if (!date || !updatedDate) {
            return res.status(400).json({ message: 'Please provide valid dates' });
        }
        if (new Date(updatedDate) <= new Date(date)) {
            return res.status(400).json({ message: "Updated date must be later than the original date" });
        }

        // Find the attendance record by ID
        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Ensure the logged-in user owns the record
        if (attendance.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this record' });
        }

        // Update the record
        attendance.date = date;
        attendance.updatedDate = updatedDate;
        await attendance.save();

        res.status(200).json({ message: 'Milk update customized successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Error customizing milk update', error });
    }
};

//update the milk for tommarow only 
exports.updateMilkForTomorrow = async (req, res) => {
    try {
        const { id } = req.params; // Attendance record ID
        const { date, updatedDate, milkQuantity } = req.body; // Input data

        // Validate input
        if (!date || !updatedDate || !milkQuantity) {
            return res.status(400).json({ message: 'Please provide date, updatedDate, and milkQuantity' });
        }

        const originalDate = new Date(date);
        const tomorrowDate = new Date(originalDate);
        tomorrowDate.setDate(originalDate.getDate() + 1);

        // Check if updatedDate matches tomorrow's date
        if (new Date(updatedDate).toDateString() === tomorrowDate.toDateString()) {
            return res.status(200).json({
                message: `Milk quantity for ${updatedDate} has been set to ${milkQuantity}. This change is only for tomorrow.`,
            });
        }

        // Find the attendance record by ID
        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Ensure the logged-in user owns the record
        if (attendance.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this record' });
        }

        // Update the record
        attendance.milkQuantity = milkQuantity;
        await attendance.save();

        res.status(200).json({
            message: 'Milk quantity updated successfully',
            attendance,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating milk quantity', error });
    }
};

