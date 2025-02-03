const Contact = require('../models/Contact');

exports.addContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Contact added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding contact', error });
    }
};

//get contact information
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};
