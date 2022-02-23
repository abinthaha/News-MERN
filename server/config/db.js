const mongoose = require('mongoose');
const config = require('./default.json');
const db = config.mongoURI;
// console.log(config.mongoURI);

const connectDB = async () => {
    try {
        await mongoose.connect(
            db, {
                useNewUrlParser: true
            }
        );

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;