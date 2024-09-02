import express from "express";
import "dotenv/config";
import cors from "cors";

import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import "./socketio/soketio.js"
// import path from "path"
import path from "path";
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//deployment
// const __dirname = path.resolve();
//deployment

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World 123");
});

// Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/messages", messageRoutes);

//deployment
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "chatapp", "build")));

res.sendFile(path.resolve(__dirname, "chatapp", "build", "index.html"));
})

//deployment

const PORT = process.env.PORT || 8080;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
