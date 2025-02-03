const Invoice = require('../models/UserInvoice');
const Order = require('../models/orders');
const Attendance = require('../models/Attendance');
const Price = require('../models/Prices');

exports.createUserInvoice = async (req, res) => {
    const { userId, startDate, endDate, milkType } = req.body;

    try {
        // Fetch the price for the chosen milk type
        const priceRecord = await Price.findOne({ milkType });
        if (!priceRecord) {
            return res.status(404).json({ message: 'Price not found for the specified milk type' });
        }
        const price = priceRecord.milkPrice;

        // Fetch attendance records within the specified date range
        const attendances = await Attendance.find({
            userId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        if (attendances.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for the specified date range' });
        }

        let totalAmount = 0;
        let presentDaysCount = 0;
        let absentDaysCount = 0;
        let totalQuantity = 0;

        attendances.forEach(attendance => {
            if (attendance.attendance === 'present') {
                totalAmount += (attendance.quantity * price);
                totalQuantity += attendance.quantity;
                presentDaysCount++;
            } else {
                absentDaysCount++;
            }
        });

        const invoice = new Invoice({
            userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            milkType,
            totalQuantity,
            totalAmount,
            presentDaysCount,
            absentDaysCount,
            invoiceDate: new Date()
        });

        await invoice.save();
        res.status(201).json({ message: 'Invoice created successfully', invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating invoice', error });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate('userId', 'userName email'); // ✅ Fetch userName from userId

        res.status(200).json({ message: 'Invoices retrieved successfully', invoices });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invoices', error });
    }
};

exports.getUserInvoice = async (req, res) => {
    const { userId } = req.params;

    try {
        const invoice = await Invoice.find({ userId })
            .populate('userId', 'userName email'); // ✅ Fetch user details

        if (!invoice || invoice.length === 0) {
            return res.status(404).json({ message: 'No invoices found for this user' });
        }

        res.status(200).json({ message: 'Invoice retrieved successfully', invoice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user invoice', error });
    }
};
