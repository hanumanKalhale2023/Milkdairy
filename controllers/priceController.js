const Price = require("../models/Prices");

// Add a new price
exports.addPrice = async (req, res) => {
  try {
    const price = new Price(req.body);
    console.log(price);
    if (!price) {
      return res.status(400).json({ message: "Invalid price data" });
    }
    await price.save();
    res.status(201).json({ message: "Price added successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error adding price", error: e.message });
  }
};

// Get the price of a specific milk type
exports.getPrice = async (req, res) => {
  try {
    const price = await Price.findOne({ milkType: req.body.milkType });
    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }
    res.json(price);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving price", error: error.message });
  }
};

// Update the price using ID
exports.updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }
    res.json(price);
  } catch (e) {
    res.status(500).json({ message: "Error updating price", error: e.message });
  }
};

// Get all milk type prices
exports.getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find({});
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving prices", error: error.message });
  }
};

// Delete a price by ID
exports.deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const price = await Price.findByIdAndDelete(id);
    if (!price) {
      return res.status(404).json({ message: "Price not found" });
    }
    res.json({ message: "Price deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting price", error: error.message });
  }
};
