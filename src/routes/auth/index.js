import { Router } from "express";
const router = Router();

import userAuthRoutes from "./userAuth.routes.js";
router.use("/user", userAuthRoutes);

import adminAuthRoutes from "./adminAuth.routes.js";
router.use("/admin", adminAuthRoutes);

export default router;
