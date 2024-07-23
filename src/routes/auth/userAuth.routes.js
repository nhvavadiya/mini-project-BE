import { Router } from "express";
const router = Router();

import { login, register } from "../../controllers/user/index.js";

router.post("/login", login);
router.post("/register", register);

export default router;
