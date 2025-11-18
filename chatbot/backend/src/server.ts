import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// CONNECT DB
connectDB();

// ROUTES
app.use("/api/tasks", taskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
