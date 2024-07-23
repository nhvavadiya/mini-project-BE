import { Router } from "express";
const router = Router();

import { hotelList } from "../../controllers/hotel/index.js";
import { adminUserAuth } from "../../middleware/index.js";

router.get("/list", adminUserAuth, hotelList);

export default router;
