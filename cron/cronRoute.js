import express from "express";
import { protect } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/trigger-task",protect, (req, res) => {
    console.log("task route")
  res.send("Task Triggered Successfully!");
});

export default router;