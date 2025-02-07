const Order = require('../models/orders'); // Import the Order model
const User = require('../models/User');   // Import the User model (for validation)
const Attendance= require('../models/Attendance');// Import the Attendance model (for validation)

// Create an Order
exports.createOrder = async (req, res) => {
    const { userId, startDate, endDate, milkType, quantity, price } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newOrder = new Order({
            userId,
            startDate,
            endDate,
            milkType,
            quantity,
            price
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};
// Update an Order
exports.updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { startDate, milkType, quantity, price } = req.body;

    try {
        // Find the order by ID and update it
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { startDate, milkType, quantity, price },
            { new: true } // Return the updated order
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error });
    }
};

// Delete an Order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        // Find the order by ID and delete it
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};
//pagination is enabled
const getAllOrders = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const orders = await Order.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders,
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'Error retrieving orders', error });
    }
};
//filtered orders
const getFilteredOrders = async (req, res) => {
    const { startDate, endDate, milkType, userId } = req.query;
    const filter = {};

    if (startDate && endDate) {
        filter.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (milkType) {
        filter.milkType = milkType;
    }
    if (userId) {
        filter.userId = userId;
    }

    try {
        const orders = await Order.find(filter)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ message: 'Filtered orders retrieved successfully', orders });
    } catch (error) {
        console.error('Error filtering orders:', error);
        res.status(500).json({ message: 'Error filtering orders', error });
    }
};

// Get Orders for a Specific User
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('userId', 'name email');
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error });
    }
};
