import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse, sendError } from "../../shared/utils/response";

export class AuthController {
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // This is a dummy check for demonstration
            // In a real app, you would verify credentials against a database
            if (email === "admin@example.com" && password === "password123") {
                const token = AuthService.generateToken({ email, role: "admin" });
                return sendResponse(res, 200, true, "Login successful", { token });
            }

            return sendError(res, 401, "Invalid credentials");
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }
}
