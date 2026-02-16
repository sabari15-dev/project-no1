import { Request, Response } from "express";
import { RequestService } from "./request.service";
import { sendResponse, sendError } from "../../shared/utils/response";

export class RequestController {
    static async createRequest(req: Request, res: Response) {
        try {
            const request = await RequestService.create(req.body);
            return sendResponse(res, 201, true, "Booking request created successfully", request);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async getAllRequests(req: Request, res: Response) {
        try {
            const requests = await RequestService.getAll();
            return sendResponse(res, 200, true, "Requests retrieved successfully", requests);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async updateRequestStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!["Approved", "Rejected"].includes(status)) {
                return sendError(res, 400, "Invalid status");
            }
            await RequestService.updateStatus(id, status);
            return sendResponse(res, 200, true, `Request ${status.toLowerCase()} successfully`);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }
}
