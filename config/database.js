import mongoose from "mongoose";

let connect = false;
const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // if db is already connected then do not connect again
    if (connect) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error);  
    }
}

export default connectDB;