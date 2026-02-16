import { Router } from "express";
import { EmployeeController } from "./employee.controller";

const router = Router();

router.post("/", EmployeeController.createEmployee);
router.get("/", EmployeeController.getAllEmployees);
router.get("/:id", EmployeeController.getEmployeeById);
router.delete("/:id", EmployeeController.deleteEmployee);

export default router;
