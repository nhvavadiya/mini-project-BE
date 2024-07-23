import { Router } from "express";
const router = Router();

import authRoutes from "./auth/index.js";
router.use("/auth", authRoutes);

import hotelRoutes from "./hotel/index.js";
router.use("/hotel", hotelRoutes);

// exporting router
export default router;
