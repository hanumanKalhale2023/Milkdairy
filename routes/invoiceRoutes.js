const express = require('express');
const { createUserInvoice, getAllInvoices , getUserInvoice} = require('../controllers/invoiceController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/invoice', verifyAdmin, createUserInvoice);
router.get('/invoices', verifyAdmin, getAllInvoices);
router.get('/invoices/:userId',verifyAdmin, getUserInvoice);

module.exports = router;