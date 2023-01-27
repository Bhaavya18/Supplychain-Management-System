import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import commodityRoute from "./routes/commodity.js";
import wareHouseRoute from "./routes/wareHouse.js";
import businessRoute from "./routes/business.js";
import authRoute from "./routes/auth.js";
import orderRoute from "./routes/order.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/commodity", commodityRoute);
app.use("/api/wareHouse", wareHouseRoute);
app.use("/api/business", businessRoute);
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(8080, () => {
  connect();
  console.log("Connected to backend.");
});
