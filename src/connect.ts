import mongoose from "mongoose";

async function connectToDb(url: any) {
  try {
    await mongoose.connect(url);
    console.log("Database connected 🔥");
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}

export { connectToDb };
