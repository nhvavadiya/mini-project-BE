import { Router } from "express";
const router = Router();

import userAuthRoutes from "./userAuth.routes.js";
router.use("/user", userAuthRoutes);

export default router;
