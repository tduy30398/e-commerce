const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, mobile } = req.body;
    if (!email || !password || !firstName || !lastName || !mobile) {
        return res.status(400).json({
            success: false,
            mes: 'Missing input'
        });
    }
    const user = await User.findOne({ email });
    if (user) throw new Error('User has existed');
    const newUser = await User.create(req.body);
    return res.status(200).json({
        success: newUser ? true : false,
        mes: newUser ? 'Register successfully' : 'Something went wrong'
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: 'Missing input'
        });
    }
    const user = await User.findOne({ email });
    if (!user) throw new Error("Can't find this email");
    const isCorrectPasswrod = await user.checkPassword(password);
    if (!isCorrectPasswrod) throw new Error('Incorrect password');
    else {
        const { role, password, ...userData } = user.toObject();
        return res.status(200).json({
            success: true,
            userData
        });
    }
});

module.exports = {
    register,
    login
};
