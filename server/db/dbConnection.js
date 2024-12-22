const { MongoClient } = require('mongodb');
require('dotenv').config();
// Replace with your MongoDB URI
const uri =`mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASS}@data.2leny.mongodb.net/?retryWrites=true&w=majority&appName=data`;

let db = null;

async function connectMongo() {
    if (!db) {
        client = new MongoClient(uri);
        try {
            await client.connect(); // Connect to MongoDB
            db=await client.db('app');
            console.log('MongoDB connection successful');
        } catch (e) {
            console.error('Error connecting to MongoDB:', e);
            process.exit(1); // Exit process if connection fails
        }
    }
    return db;
}

module.exports = connectMongo;
