const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobile: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        },
        cart: {
            type: Array,
            default: []
        },
        address: [{ type: mongoose.Types.ObjectId, ref: 'Address' }],
        wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
        isBlocked: {
            type: Boolean,
            default: false
        },
        refreshToken: {
            type: String
        },
        passwordChangedAt: {
            type: String
        },
        passwordResetToken: {
            type: String
        },
        passwordResetExpires: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

// Xử lý trước khi save
userSchema.pre('save', async function (next) {
    // Nếu ko chỉnh sửa password thì chạy vào if này => next
    if (!this.isModified('password')) next();
    // Nếu đang chỉnh sửa password thì ko chạy vào if => xuống đây hash lại password
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Define các function
userSchema.methods = {
    // check password user đăng nhập và password đang lưu trong DB (hashed)
    checkPassword: async function (password) {
        const isCorrectPassword = await bcrypt.compare(password, this.password);
        return isCorrectPassword;
    }
};

//Export the model
module.exports = mongoose.model('User', userSchema);
