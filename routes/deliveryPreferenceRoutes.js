const express = require("express");
const { addDeliveryPrefence, updateDeliveryPreference, deleteDeliveryPreference } = require("../controllers/deliveryPreferenceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Delivery Preference Routes
router.post("/", authMiddleware, addDeliveryPrefence);
router.put("/:preferenceId", authMiddleware, updateDeliveryPreference);
router.delete("/:preferenceId", authMiddleware, deleteDeliveryPreference);

module.exports = router;
