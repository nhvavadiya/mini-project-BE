import { Router } from "express";
const router = Router();

import { roomList } from "../../controllers/hotel/index.js";
import { userAuth } from "../../middleware/index.js";

router.get("/list/:id", userAuth, roomList);

export default router;
