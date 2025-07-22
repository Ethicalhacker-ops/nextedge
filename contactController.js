const Contact = require('../models/Contact');
const { sendContactEmail } = require('./emailController');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        const newContact = new Contact({
            name,
            email, 
            phone,
            message
        });

        await newContact.save();
        await sendContactEmail({ name, email, message });

        res.status(201).json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
