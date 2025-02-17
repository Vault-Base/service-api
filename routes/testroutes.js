import express from "express";
import { test } from "../controllers/testcontroller";
const testrouter = express.Router();
testrouter.get("/test",test);
export default testrouter;