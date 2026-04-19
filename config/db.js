import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("Database not connected");
    process.exit(1)
  }
};

export default connectDb;
