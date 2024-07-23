import { Router } from "express";
const router = Router();

import hotelRoutes from "./hotel.routes.js";
router.use("/details", hotelRoutes);

import roomRoutes from "./room.routes.js";
router.use("/room", roomRoutes);

import slotRoutes from "./slot.routes.js";
router.use("/slot", slotRoutes);

import bookRoutes from "./book.routes.js";
router.use("/book", bookRoutes);

export default router;
