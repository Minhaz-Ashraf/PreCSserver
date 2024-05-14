const User = require('../models/user');

exports.register = async (req, res) => {
    const { fullname, email, phone } = req.body;
    try {
        const newUser = new User({
            fullname,
            email,
            phone,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
