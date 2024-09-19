import mongoose from "mongoose";

const db = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log the actual error message
    process.exit(1); // Exit the process if there's an error
  }
};

export default db;
