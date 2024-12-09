const { MongoClient } = require('mongodb');

// Replace with your MongoDB URI
const uri = `mongodb+srv://ash22kk:dia@data.2leny.mongodb.net/?retryWrites=true&w=majority&appName=data`;

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
