const mongoose = require("mongoose");

const deliveryPreferencesSchema = mongoose.Schema(
  {
    callBeforeDelivery: Boolean,
    ringTheBell: Boolean,
    doorImage: {
      data: Buffer, // Store binary data for images
      contentType: String, // e.g., 'image/png', 'image/jpeg'
    },
    voiceInstruction: {
      data: Buffer, // Store binary data for audio
      contentType: String, // e.g., 'audio/mpeg', 'audio/wav'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryPreferences", deliveryPreferencesSchema);
