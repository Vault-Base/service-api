import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import storageRoutes from "./routes/stroageRoutes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import cachingRouter from "./routes/cachingRoutes.js";
import KeyValueService from "./store/keyValueService.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))
app.use("/api/storage",storageRoutes)
app.use('/api/caching',cachingRouter)
app.use(cors()) //temporray
// const corsOptions = {
//     origin: [],
//     methods: "GET,POST,PUT,DELETE", 
//     credentials: true, 
// }
// app.use(cors(corsOptions));
 mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to db")
 })
const port = process.env.PORT
const service = new KeyValueService(); 
service.loadMemory();
app.locals.service = service;
const server = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})
