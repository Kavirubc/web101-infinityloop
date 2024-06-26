'use server';

import { MongoClient } from 'mongodb';
import * as yup from 'yup';

const username = encodeURIComponent(process.env.USERNAME || "");
const password = encodeURIComponent(process.env.PASSWORD || "");
const cluster = "crud-app.jgjleuo.mongodb.net";
const dbName = "delegates"; // Database name
const authSource = "admin"; // Usually "admin", adjust if different
const authMechanism = "SCRAM-SHA-1"; // Or "SCRAM-SHA-256", based on your configuration

let uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&authSource=${authSource}&authMechanism=${authMechanism}`;

const client = new MongoClient(uri);

async function getDbConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

async function initializeDb() {
    const db = await getDbConnection();
    try {
        await db.collection('web101').createIndex({ 'email': 1 }, { unique: true });
        console.log('Database initialized');
    } catch (err: any) {
        console.error('Error initializing database:', err.message);
    }
}

async function checkDelegateExists(email: string): Promise<boolean> {
    const db = await getDbConnection();
    const delegate = await db.collection("web101").findOne({ email });
    return !!delegate;
}

const userSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
});

export async function createUser(userData: any) {
    try {
        await userSchema.validate(userData);

        const email = userData.email;
        const exists = await checkDelegateExists(email);
        if (exists) {
            console.log('User already exists');
            throw new Error('User already exists');
        }

        const newDelegate = {
            name: userData.name,
            email: userData.email,
            createdAt: new Date()
        }

        const db = await getDbConnection();
        const result = await db.collection('web101').insertOne(newDelegate);
        console.log(`A User has been inserted with id: ${result.insertedId}`);

    } catch (err: any) {
        console.error('Error in createUser function:', err.message);
        throw err;
    }
}

//get request

export async function getDelegates() {
    const db = await getDbConnection();
    return db.collection('web101').find().toArray();
}

initializeDb();
