import express from "express";
import dotenv from "dotenv";
import db from "./db/index";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes); // IMPORTANT

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  try {
    await db.query("SELECT NOW()");
    console.log("PostgreSQL connected successfully");
  } catch (err) {
    console.error("PostgreSQL connection failed:", err);
  }
});
