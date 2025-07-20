import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import authRouter from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/route.js";
import generateContent from "./gemini.js";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", async (req, res) => {
  let prompt = req.query.prompt || "Hello, AI Assistant!";
  let response = await generateContent(prompt);
 

  res.status(200).json(response);
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
