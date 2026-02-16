import axios from "axios";
import { IFlightProvider, FlightSearchQuery, FlightResult } from "../flight.interface";
import { RiyaBookingRequest, RiyaBookingResponse, RiyaItineraryFlight, RiyaPaxDetails, RiyaAddressDetails, RiyaGSTInfo } from "./riya.interface";

export class RiyaProvider implements IFlightProvider {
    name = "Riya";
    private baseUrl = "http://apiapps.riya.travel/v4.0/TravelAPI.svc";

    // These should ideally come from environment variables or a config service
    private readonly AGENT_ID = process.env.RIYA_AGENT_ID || "DEMO_AGENT";
    private readonly TERMINAL_ID = process.env.RIYA_TERMINAL_ID || "DEMO_TERM";
    private readonly USERNAME = process.env.RIYA_USERNAME || "DEMO_USER";

    async login(): Promise<any> {
        // Implementation for Riya Login
        return { success: true };
    }

    async availability(query: FlightSearchQuery): Promise<FlightResult[]> {
        // Implementation for Riya Availability
        return [];
    }

    async getFareRules(flightId: string): Promise<any> {
        // Call {URL}/GetFareRule
        return { success: true };
    }

    async pricing(flightId: string): Promise<any> {
        // Call {URL}/Pricing
        return { success: true };
    }

    async getSeatMap(flightId: string): Promise<any> {
        // Call {URL}/GetAvailSeatMap
        return { success: true };
    }

    async getSSR(flightId: string): Promise<any> {
        // Call {URL}/GetSSR
        return { success: true };
    }

    async addSSR(bookingId: string, ssrData: any): Promise<any> {
        // Call {URL}/AddSSR
        return { success: true };
    }

    async book(bookingData: any): Promise<RiyaBookingResponse> {
        console.log(`Calling Riya API to book flight: ${this.baseUrl}/Book`);

        try {
            // Mapping incoming bookingData to RiyaBookingRequest
            // bookingData is expected to have fields matching RiyaBookingRequest partially
            const requestPayload: RiyaBookingRequest = {
                AgentID: this.AGENT_ID,
                TerminalID: this.TERMINAL_ID,
                Username: this.USERNAME,
                AppType: "API",
                Version: "4.0", // Assuming 4.0 as per baseUrl
                AdultCount: bookingData.AdultCount || 1,
                ChildCount: bookingData.ChildCount || 0,
                InfantCount: bookingData.InfantCount || 0,
                ItineraryFlightsInfo: bookingData.ItineraryFlightsInfo || [],
                PaxDetailsInfo: bookingData.PaxDetailsInfo || [],
                AddressDetails: bookingData.AddressDetails,
                GSTInfo: bookingData.GSTInfo,
                TripType: bookingData.TripType || "O",
                BlockPNR: bookingData.BlockPNR ?? false,
                Faremasking: bookingData.Faremasking ?? false,
                BaseOrigin: bookingData.BaseOrigin,
                BaseDestination: bookingData.BaseDestination,
                TrackId: bookingData.TrackId
            };

            const response = await axios.post(`${this.baseUrl}/Book`, requestPayload, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const riyaData = response.data;

            return {
                success: riyaData.ResponseStatus === "Success",
                PNR: riyaData.PNR,
                Message: riyaData.ErrorMessage || "Booking Processed",
                Status: riyaData.Status,
                rawData: riyaData
            };
        } catch (error: any) {
            console.error("Riya Booking Error:", error.message);
            return {
                success: false,
                Message: error.message,
                rawData: error.response?.data
            };
        }
    }

    async issueTicket(bookingId: string): Promise<any> {
        // Call {URL}/IssueTicket
        return { success: true };
    }

    async holdCancel(bookingId: string): Promise<any> {
        // Call {URL}/HoldCance
        return { success: true };
    }

    async retrieveBooking(pnr: string): Promise<any> {
        // Call {URL}/RetrieveBooking
        return { success: true };
    }

    async trackStatus(pnr: string): Promise<any> {
        // Call {URL}/TrackStatus
        return { success: true };
    }

    async cancel(pnr: string): Promise<any> {
        // Call {URL}/Cancel
        return { success: true };
    }

    async rescheduleAvail(pnr: string, newDate: string): Promise<any> {
        // Call {URL}/RescheduleAvail
        return { success: true };
    }

    async reschedule(pnr: string, rescheduleData: any): Promise<any> {
        // Call {URL}/Reschedule
        return { success: true };
    }

    async getBalance(): Promise<any> {
        // Call {URL}/GetBalance
        return { success: true };
    }
}
