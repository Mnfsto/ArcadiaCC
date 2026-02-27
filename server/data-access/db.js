const { MongoClient, ServerApiVersion } = require('mongodb');

let db = null;
let client = null;

async function connectDB() {
    if (db) return db;

    const url = process.env.MONGODB_URI;
    if (!url) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    client = new MongoClient(url, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        db = client.db("usersdb");
        console.log("Connected to MongoDB successfully");
        return db;
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        throw err;
    }
}

function getCollection(name) {
    if (!db) throw new Error("Database not connected. Call connectDB first.");
    return db.collection(name);
}

async function closeConnection() {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

module.exports = {
    connectDB,
    getCollection,
    closeConnection
};
