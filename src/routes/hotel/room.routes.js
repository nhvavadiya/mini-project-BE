import { Router } from "express";
const router = Router();

import { roomList } from "../../controllers/hotel/index.js";
import { adminUserAuth } from "../../middleware/index.js";

router.get("/list/:id", adminUserAuth, roomList);

export default router;
