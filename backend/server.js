import express from "express";
import  dotenv from "dotenv";
import connectDB from "./db/Connectdb.js";
dotenv.config();
connectDB();
const app=express();
const PORT=process.env.PORT||5000
app.listen(5000,()=> console.log(`server started at ${PORT} hey`))