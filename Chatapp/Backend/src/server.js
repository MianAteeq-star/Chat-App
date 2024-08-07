import express from "express";
import "dotenv/config";
import cors from "cors";

import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
