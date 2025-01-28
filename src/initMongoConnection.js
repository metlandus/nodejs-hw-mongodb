import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function initMongoConnection() {
    const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=FirstCluster`;

    if (!mongoUri) {
        console.error('MongoDB connection string is missing in environment variables');
        process.exit(1);
    }

    mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });
}

export default initMongoConnection;