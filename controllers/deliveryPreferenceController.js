const multer = require("multer");
const DeliveryPreference = require("../models/DeliveryPreference");

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: "doorImage", maxCount: 1 },
  { name: "voiceInstruction", maxCount: 1 },
]);

//add the delivery preferences to the 
exports.addDeliveryPrefence = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", err });
    }

    console.log("Files:", req.files);
    console.log("Body:", req.body);

    try {
      const userId = req.user.id;

      const deliveryPrefenceData = {
        callBeforeDelivery: req.body.callBeforeDelivery,
        ringTheBell: req.body.ringTheBell,
        userId,
      };

      if (req.files && req.files.doorImage) {
        deliveryPrefenceData.doorImage = {
          data: req.files.doorImage[0].buffer,
          contentType: req.files.doorImage[0].mimetype,
        };
      }

      if (req.files && req.files.voiceInstruction) {
        deliveryPrefenceData.voiceInstruction = {
          data: req.files.voiceInstruction[0].buffer,
          contentType: req.files.voiceInstruction[0].mimetype,
        };
      }

      const deliveryPrefence = new DeliveryPreference(deliveryPrefenceData);
      await deliveryPrefence.save();

      res.status(201).json({ message: "Delivery preference added successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error adding delivery preference",
        error: error.message,
      });
    }
  });
};

//update delivery preference 
exports.updateDeliveryPreference = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "File upload error", error: err.message });
    }

    console.log("Files received:", req.files);
    console.log("Body received:", req.body);

    try {
      const userId = req.user.id; // Extract user ID from authenticated user
      const { preferenceId } = req.params; // Extract preference ID from route parameters
      console.log("Preference ID:", preferenceId);
      console.log("User ID:", userId);
      if (!preferenceId) {
        return res.status(400).json({ message: "Preference ID is required" });
      }

      // Build update data
      const deliveryPreferenceData = {
        callBeforeDelivery: req.body.callBeforeDelivery,
        ringTheBell: req.body.ringTheBell,
      };

      // Attach files if they exist
      if (req.files && req.files.doorImage) {
        deliveryPreferenceData.doorImage = {
          data: req.files.doorImage[0].buffer,
          contentType: req.files.doorImage[0].mimetype,
        };
      }

      if (req.files && req.files.voiceInstruction) {
        deliveryPreferenceData.voiceInstruction = {
          data: req.files.voiceInstruction[0].buffer,
          contentType: req.files.voiceInstruction[0].mimetype,
        };
      }

      // Find the delivery preference by ID and userId and update it
      const updatedPreference = await DeliveryPreference.findOneAndUpdate(
        { _id: preferenceId,}, // Match both the preference ID and user ID for security
        deliveryPreferenceData,
        { new: true, runValidators: true } // Return the updated document
      );

      if (!updatedPreference) {
        return res.status(404).json({ message: "Delivery preference not found" });
      }

      res.status(200).json({
        message: "Delivery preference updated successfully",
        updatedPreference,
      });
    } catch (error) {
      console.error("Error updating delivery preference:", error);
      res.status(500).json({
        message: "Error updating delivery preference",
        error: error.message,
      });
    }
  });
};

//delete the delivery preferences
// Delete delivery preference
exports.deleteDeliveryPreference = async (req, res) => {
  try {
    const { preferenceId } = req.params; // Get the preference ID from the route parameters

    if (!preferenceId) {
      return res.status(400).json({ message: "Preference ID is required" });
    }

    // Find the delivery preference by ID and delete it
    const deletedPreference = await DeliveryPreference.findByIdAndDelete(preferenceId);

    if (!deletedPreference) {
      return res.status(404).json({ message: "Delivery preference not found" });
    }

    res.status(200).json({
      message: "Delivery preference deleted successfully",
      deletedPreference,
    });
  } catch (error) {
    console.error("Error deleting delivery preference:", error);
    res.status(500).json({
      message: "Error deleting delivery preference",
      error: error.message,
    });
  }
};
