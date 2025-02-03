const DailyEntry = require('../models/DailyEntry');
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');

exports.addDailyEntry = async (req, res) => {
    const { userId, attendance, quantity } = req.body; // Attendance and quantity can be edited by frontend
    const adminId = req.user.id; // Retrieved from the auth middleware
    const today = new Date().setHours(0, 0, 0, 0); // Start of today

    try {
        // Check if the user's attendance exists
        let userAttendance = await Attendance.findOne({ userId });

        if (!userAttendance) {
            return res.status(404).json({ message: 'User attendance record not found' });
        }

        // Ensure no user ID mismatch
        if (userAttendance.userId.toString() !== userId) {
            return res.status(400).json({ message: 'User ID mismatch in attendance record' });
        }

        // Check if an entry already exists for today
        const existingEntry = await DailyEntry.findOne({
            userId,
            date: { $gte: today, $lte: new Date() }, // Match entries for the same day
        });

        if (existingEntry) {
            // Update the existing entry with the new attendance and quantity from the frontend
            existingEntry.attendance = attendance || existingEntry.attendance; // Update attendance if provided
            existingEntry.quantity = quantity || existingEntry.quantity; // Update quantity if provided
            existingEntry.updatedBy = adminId;
            existingEntry.updatedDate = new Date();

            // Save the updated entry
            const updatedEntry = await existingEntry.save();
            return res.status(200).json({ message: 'Attendance updated successfully', dailyEntry: updatedEntry });
        }

        // If no entry exists for today, create a new daily entry
        const newEntry = new DailyEntry({
            userId,
            attendance: attendance || userAttendance.attendance, // Use the provided attendance or default to the existing value
            quantity: quantity || userAttendance.quantity, // Use the provided quantity or default to the existing value
            updatedBy: adminId,
            updatedDate: new Date(), // Update the timestamp
        });

        // Save the entry
        const savedEntry = await newEntry.save();
        res.status(201).json({ message: 'Attendance stored successfully', dailyEntry: savedEntry });
    } catch (error) {
        console.error('Error storing attendance:', error);
        res.status(500).json({ message: 'Error storing attendance', error: error.message });
    }
};


// Get daily entries for a specific user or all users
exports.getDailyEntry = async (req, res) => {
    const { userId } = req.query; // Optional query parameter
    try {
        let query = {};
        
        // If a userId is provided, filter by userId
        if (userId) {
            query.userId = userId;
        }

        // Fetch daily entries from the database
        const dailyEntries = await DailyEntry.find(query).populate('userId', 'name email'); // Populating user data for context
        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found' });
        }

        res.status(200).json({ message: 'Daily entries fetched successfully', dailyEntries });
    } catch (error) {
        console.error('Error fetching daily entries:', error);
        res.status(500).json({ message: 'Error fetching daily entries', error: error.message });
    }
};

exports.updateDailyEntry = async (req, res) => {
    const { userId, attendance, quantity } = req.body;
    const { dailyEntryId } = req.params; // ID of the entry to be updated
    const adminId = req.user.id; // Retrieved from the auth middleware

    console.log("Requested dailyEntryId:", dailyEntryId);

    try {
        // Find the daily entry by ID
        const dailyEntry = await DailyEntry.findById(dailyEntryId); // Directly pass the ID as a string

        console.log("Found dailyEntry:", dailyEntry);

        if (!dailyEntry) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }

        // Ensure the userId matches
        if (dailyEntry.userId.toString() !== userId) {
            return res.status(400).json({ message: 'User ID mismatch in daily entry' });
        }

        // Update the fields
        dailyEntry.attendance = attendance || dailyEntry.attendance;
        dailyEntry.quantity = quantity || dailyEntry.quantity;
        dailyEntry.updatedBy = adminId;
        dailyEntry.updatedDate = new Date();

        // Save the updated entry
        const updatedEntry = await dailyEntry.save();

        res.status(200).json({ message: 'Daily entry updated successfully', dailyEntry: updatedEntry });
    } catch (error) {
        console.error('Error updating daily entry:', error);
        res.status(500).json({ message: 'Error updating daily entry', error: error.message });
    }
};
