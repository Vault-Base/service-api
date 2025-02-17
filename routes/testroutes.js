import express from "express";
import { test } from "../controllers/testcontroller.js";
const testrouter = express.Router();
testrouter.get("/test",test);
export default testrouter;