const { default: mongoose } = require('mongoose');

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        if (connection.connection.readyState === 1) {
            console.log('success');
        } else {
            console.log('fail');
        }
    } catch (error) {
        console.log('DB connection failed');
        throw new Error(error);
    }
};

module.exports = dbConnect;
