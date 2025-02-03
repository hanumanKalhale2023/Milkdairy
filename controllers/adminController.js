const Admin = require('../models/Admin'); // Import the Admin model
const User = require('../models/user');   // User model (to fetch users)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin Registration
const registerAdmin = async (req, res) => {
  const { adminId, password } = req.body;

  try {
    // Check if adminId already exists
    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin ID already exists' });
    }

    // Create a new admin
    const newAdmin = new Admin({ adminId, password });
    await newAdmin.save(); // Password will be hashed in the `pre('save')` hook

    res.status(201).json({ message: 'Admin registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering admin', error });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
    const { adminId, password } = req.body;
  
    try {
      console.log(req.body);
      // Find admin by ID
      const admin = await Admin.findOne({ adminId });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid ID or password' });
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid ID or password' });
      }
  
      // Generate JWT with the role
      const token = jwt.sign(
        { id: admin._id, adminId: admin.adminId, role: 'admin' }, // Add role field
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token, message: 'Login successful!' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };
  


// Get all users (Admin-only functionality)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({ message: 'No users found' });  // Return 404 if no users are found in the database
        } // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
// Create a new user
const createUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
// Update user details (Admin-only functionality)
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { userName, email, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (password) {
      // Hash the new password before saving
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'User updated successfully!', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user (Admin-only functionality)
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and remove from the database
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = { registerAdmin, loginAdmin, getAllUsers, createUser, updateUser, deleteUser };
