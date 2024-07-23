import { Router } from "express";
const router = Router();

import { slotList } from "../../controllers/hotel/index.js";
import { adminUserAuth } from "../../middleware/index.js";

router.get("/list/:id", adminUserAuth, slotList);

export default router;
