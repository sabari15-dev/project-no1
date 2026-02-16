import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../modules/auth/auth.service";
import { sendError } from "../utils/response";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendError(res, 401, "Authorization token missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
        return sendError(res, 401, "Invalid or expired token");
    }

    // Attach user info to request
    (req as any).user = decoded;
    next();
};
