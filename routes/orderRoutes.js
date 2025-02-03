const express = require('express');
const {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
} = require('../controllers/ordersController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Create an order
router.post('/orders', verifyAdmin, createOrder);

// Update an order
router.put('/orders/:orderId', verifyAdmin, updateOrder);

// Delete an order
router.delete('/orders/:orderId', verifyAdmin, deleteOrder);

// Get all orders
router.get('/orders', verifyAdmin, getAllOrders);

// Get orders for a specific user
router.get('/orders/user/:userId', verifyAdmin, getUserOrders);

module.exports = router;
