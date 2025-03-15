import express from "express";
import { updateMarquee, getMarquee } from "../controllers/marqueeController.js";

const marqueeRouter = express.Router();

marqueeRouter.get("/getmarquee", getMarquee); // Fetch the marquee
marqueeRouter.put("/updatemarquee", updateMarquee); // Update the marquee


export default marqueeRouter;


