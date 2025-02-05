import express from "express";
import { protect } from "../middlewares/middleware.js";
import { getKey, setKey } from "../controllers/cachingController.js";
const cachingRouter = express.Router();

cachingRouter.post('/set',protect,setKey)
cachingRouter.get('/get/:uid/:key',protect,getKey)
export default cachingRouter;