import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./db";
import authRoutes from "./routes/authRoutes";
import pageRoutes from "./routes/pageRoutes";
const app = express();
// important behind Render proxy
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(authRoutes);
app.use(pageRoutes);
const PORT = Number(process.env.PORT || 3000);
async function main() {
  console.log(" Starting server...");
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing from .env");
  }

  await connectDB(uri);
  
  app.listen(PORT, () => {
    console.log(`✅ Server is running: http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("❌ Startup error:", err);
  process.exit(1);
});