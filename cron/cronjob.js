import axios from "axios";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.SECRET_KEY;

cron.schedule("*/10 * * * *", async () => {
  try {
    console.log("Making request to the route...");
    const response = await axios.get("https://service-api-q77p.onrender.com/api/tasks/trigger-task", {
      headers: {
        Authorization: TOKEN,
      },
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error making request:", error.message);
  }
});
