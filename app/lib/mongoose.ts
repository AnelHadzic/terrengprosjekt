import mongoose from "mongoose";
import config from "../../config";

const connectToDb = async (): Promise<mongoose.Connection> => {
  try {
    const db = await mongoose.connect(config.DB_KEY);

    return db.connection;
  } catch (error) {
    console.error("Something went horrible wrong", error);
  }
};

export default connectToDb;
