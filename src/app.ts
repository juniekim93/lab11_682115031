
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./db";
import authRoutes from "./routes/authRoutes";
import pageRoutes from "./routes/pageRoutes";

const app = express();

// Important for Render proxy
app.set("trust proxy", 1);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use(authRoutes);
app.use(pageRoutes);

// Port
const PORT = Number(process.env.PORT) || 3000;

async function main() {
  try {
    console.log("🚀 Starting server...");

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("❌ MONGODB_URI is missing from environment variables");
    }

    // Connect to MongoDB
    await connectDB(uri);
    console.log("✅ MongoDB connected");

    // Start server
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

main();

