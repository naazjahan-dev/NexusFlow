const dns = require("dns");
const mongoose = require("mongoose");

// Needed on some networks where the default resolver cannot look up
// Atlas mongodb+srv records (restored from the earlier working setup).
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set. Check backend/.env");
    }

    await mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;