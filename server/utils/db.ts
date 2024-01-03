import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl: string = process.env.DB_URI || '';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(dbUrl);
        console.log(`Database connected with ${connection.connection.host}`);
    } catch (err:any) {
        console.log(err.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
