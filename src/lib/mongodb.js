// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use global variable to prevent multiple connections in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production create new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
