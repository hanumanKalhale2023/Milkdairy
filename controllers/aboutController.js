const About = require('../models/About');

exports.addAbout = async (req, res) => {
    try {
        const about = new About(req.body);
        await about.save();
        res.status(201).json({ message: 'About us information added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding about information', error });
    }
};

//get about api 
exports.getAbout = async (req, res) => {
    try {
        const aboutInfo = await About.find();
        res.status(200).json(aboutInfo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching about information', error });
    }
};
