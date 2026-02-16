import { Request, Response } from "express";
import { RiyaService } from "./riya.service";
import { sendResponse, sendError } from "../../shared/utils/response";

// Create a singleton instance to maintain token across requests
const riyaService = new RiyaService();

export class RiyaController {
    /**
     * Login to Riya API and get authentication token
     */
    static async login(req: Request, res: Response) {
        try {
            const result = await riyaService.login();

            if (result.ResponseStatus === "Success") {
                return sendResponse(res, 200, true, "Login successful", {
                    token: result.Token,
                    message: "Token stored and will be used for subsequent requests"
                });
            } else {
                return sendError(res, 401, result.ErrorMessage || "Login failed");
            }
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    /**
     * Search for available flights
     */
    static async availability(req: Request, res: Response) {
        try {
            const {
                origin,
                destination,
                departureDate,
                adultCount,
                childCount,
                infantCount,
                tripType,
                returnDate
            } = req.body;

            // Validate required fields
            if (!origin || !destination || !departureDate) {
                return sendError(res, 400, "Missing required fields: origin, destination, departureDate");
            }

            const result = await riyaService.availability({
                origin,
                destination,
                departureDate,
                adultCount,
                childCount,
                infantCount,
                tripType,
                returnDate
            });

            if (result.ResponseStatus === "Success") {
                return sendResponse(res, 200, true, "Flights retrieved successfully", result);
            } else {
                return sendError(res, 400, result.ErrorMessage || "Flight search failed");
            }
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    /**
     * Get pricing details for selected flight
     */
    static async pricing(req: Request, res: Response) {
        try {
            const {
                origin,
                destination,
                tripType,
                adultCount,
                childCount,
                infantCount,
                trackId,
                itineraryInfo
            } = req.body;

            // Validate required fields
            if (!origin || !destination || !trackId || !itineraryInfo) {
                return sendError(res, 400, "Missing required fields: origin, destination, trackId, itineraryInfo");
            }

            const result = await riyaService.pricing({
                origin,
                destination,
                tripType: tripType || "O",
                adultCount: adultCount || 1,
                childCount: childCount || 0,
                infantCount: infantCount || 0,
                trackId,
                itineraryInfo
            });

            if (result.ResponseStatus === "Success") {
                return sendResponse(res, 200, true, "Pricing retrieved successfully", result);
            } else {
                return sendError(res, 400, result.ErrorMessage || "Pricing request failed");
            }
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    /**
     * Create a flight booking
     */
    static async booking(req: Request, res: Response) {
        try {
            const bookingData = req.body;

            // Validate required fields
            if (!bookingData.PaxDetailsInfo || !bookingData.ItineraryFlightsInfo || !bookingData.AddressDetails) {
                return sendError(res, 400, "Missing required fields: PaxDetailsInfo, ItineraryFlightsInfo, AddressDetails");
            }

            const result = await riyaService.booking(bookingData);

            if (result.ResponseStatus === "Success") {
                return sendResponse(res, 201, true, "Booking created successfully", result);
            } else {
                return sendError(res, 400, result.ErrorMessage || "Booking failed");
            }
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }

    /**
     * Get current token status
     */
    static async getTokenStatus(req: Request, res: Response) {
        try {
            const token = riyaService.getToken();
            return sendResponse(res, 200, true, "Token status", {
                hasToken: !!token,
                token: token ? `${token.substring(0, 20)}...` : null
            });
        } catch (error: any) {
            return sendError(res, 500, error.message);
        }
    }
}
