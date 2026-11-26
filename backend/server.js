const authRoutes = require("./routes/authRoutes");
// Load backend/.env regardless of the directory the server is started from
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); 

// Health check
app.get("/", (req, res) => {
  res.json({ message: "NexusFlow Backend is running!" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "NexusFlow API is working",
  });
});

// Start server after database connection
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`NexusFlow server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

