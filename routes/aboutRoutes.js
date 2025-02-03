const express = require('express');
const { addAbout, getAbout } = require('../controllers/aboutController');
const router = express.Router();


//about routes
router.post('/', addAbout);
router.get('/', getAbout);

module.exports = router;
