import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { sendResponse, sendError } from "../../shared/utils/response";

export class BookingController {
    static async createBooking(req: Request, res: Response) {
        try {
            const booking = await BookingService.create(req.body);
            return sendResponse(res, 201, true, "Booking created successfully", booking);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async getAllBookings(req: Request, res: Response) {
        try {
            const bookings = await BookingService.getAll();
            return sendResponse(res, 200, true, "Bookings retrieved successfully", bookings);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    static async getBookingsByEmployee(req: Request, res: Response) {
        try {
            const bookings = await BookingService.getByEmployeeId(req.params.empId);
            return sendResponse(res, 200, true, "Employee bookings retrieved successfully", bookings);
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }
}
