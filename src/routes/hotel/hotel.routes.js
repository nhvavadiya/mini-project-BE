import { Router } from "express";
const router = Router();

import { hotelList } from "../../controllers/hotel/index.js";
import { userAuth } from "../../middleware/index.js";

router.get("/list", userAuth, hotelList);

export default router;
