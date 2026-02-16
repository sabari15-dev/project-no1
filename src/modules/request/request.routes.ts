import { Router } from "express";
import { RequestController } from "./request.controller";

const router = Router();

router.post("/", RequestController.createRequest);
router.get("/", RequestController.getAllRequests);
router.patch("/:id/status", RequestController.updateRequestStatus);

export default router;
