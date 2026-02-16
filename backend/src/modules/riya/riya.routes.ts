import { Router } from "express";
import { RiyaController } from "./riya.controller";

const router = Router();

// Authentication
router.post("/login", RiyaController.login);
router.get("/token-status", RiyaController.getTokenStatus);

// Flight Search & Pricing
router.post("/availability", RiyaController.availability);
router.post("/pricing", RiyaController.pricing);

// Booking
router.post("/booking", RiyaController.booking);

export default router;
