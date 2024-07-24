import { Router } from "express";
const router = Router();

import { slotList } from "../../controllers/hotel/index.js";
import { userAuth } from "../../middleware/index.js";

router.get("/list/:id", userAuth, slotList);

export default router;
