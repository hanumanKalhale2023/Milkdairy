const express = require('express');
const {addPrice , getPrice, updatePrice, getAllPrices,deletePrice } = require('../controllers/priceController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

//price routes
router.post('/add-price', verifyAdmin, addPrice);
router.get('/get-price', verifyAdmin, getPrice);
router.put("/update-price/:id", verifyAdmin, updatePrice);
router.get("/get-all-price", verifyAdmin, getAllPrices);
// Delete a price by ID
router.delete("/delete-price/:id", verifyAdmin, deletePrice);
module.exports = router;