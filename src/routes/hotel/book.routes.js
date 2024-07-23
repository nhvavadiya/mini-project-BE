import { Router } from "express";
const router = Router();

import { bookSlot } from "../../controllers/hotel/index.js";
import { userAuth } from "../../middleware/index.js";

router.post("/slot", userAuth, bookSlot);

export default router;
