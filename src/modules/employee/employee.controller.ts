import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";
import { sendResponse, sendError } from "../../shared/utils/response";

export class EmployeeController {
    static async createEmployee(req: Request, res: Response) {
        try {
            const employee = await EmployeeService.create(req.body);
            return sendResponse(res, 201, true, "Employee created successfully", employee);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async getAllEmployees(req: Request, res: Response) {
        try {
            const employees = await EmployeeService.getAll();
            return sendResponse(res, 200, true, "Employees retrieved successfully", employees);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async getEmployeeById(req: Request, res: Response) {
        try {
            const employee = await EmployeeService.getById(req.params.id);
            if (!employee) {
                return sendError(res, 404, "Employee not found");
            }
            return sendResponse(res, 200, true, "Employee retrieved successfully", employee);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async deleteEmployee(req: Request, res: Response) {
        try {
            await EmployeeService.delete(req.params.id);
            return sendResponse(res, 200, true, "Employee deleted successfully");
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }
}
