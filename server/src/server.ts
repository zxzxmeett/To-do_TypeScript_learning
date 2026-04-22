import express from "express";
import todoRoutes from "./routes/todoRoutes";
import { connectDB } from "./config/db";

const app = express();
const PORT = 5000;
connectDB();

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});