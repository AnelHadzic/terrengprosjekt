import mongoose from "mongoose";

const DBKEY = process.env.DBKEY;

if (!DBKEY) {
  throw new Error('Please define the DB_KEY environment variable inside .env.local');
}

const connectToDb = async (): Promise<mongoose.Connection> => {
  try {
    const db = await mongoose.connect(DBKEY);
    return db.connection;
  } catch (error) {
    console.error("Something went horrible wrong", error);
    throw error;
  }
};

export default connectToDb;
