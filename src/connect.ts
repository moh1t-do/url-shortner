import mongoose from "mongoose";

async function connectToDb(url: any) {
  try {
    await mongoose.connect(url);
    console.log("Database connected 🔥");
  } catch (error) {
    console.error(error);
  }
}

export { connectToDb };
