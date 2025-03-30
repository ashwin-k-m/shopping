import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";  // Enable CORS for frontend dev server
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const __dirname = path.resolve();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
})); 
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Development: Proxy Vite frontend (no static files served)
if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode. Frontend should be served separately.");
}

// Production: Serve static files
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Backend running in ${NODE_ENV} mode at http://localhost:${PORT}`);
});