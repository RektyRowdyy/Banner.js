import { Router } from "express";
import { getBanner, updateBanner } from "../controllers/banner.controller.mjs";

const router = Router();

//get Banner Details
router.get('/getBanner', getBanner);

//update Banner Details
router.put('/updateBanner', updateBanner);

export default router;