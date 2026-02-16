import axios, { AxiosInstance } from "axios";
import {
    RiyaLoginRequest,
    RiyaLoginResponse,
    RiyaAvailabilityRequest,
    RiyaAvailabilityResponse,
    RiyaPricingRequest,
    RiyaPricingResponse,
    RiyaBookingRequest,
    RiyaBookingResponse
} from "./riya.interface";

export class RiyaService {
    private baseUrl = "http://testrws.mywebcheck.in/travelapi.svc";
    private token: string | null = null;
    private axiosInstance: AxiosInstance;

    // Agent credentials
    private readonly agentInfo = {
        AgentId: "RABOM0300132",
        TerminalId: "RABOM030013201",
        UserName: "orange01",
        AppType: "API",
        Version: "V1.0"
    };

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    /**
     * Get the current stored token
     */
    getToken(): string | null {
        return this.token;
    }

    /**
     * Set token manually (useful for testing or token refresh)
     */
    setToken(token: string): void {
        this.token = token;
    }

    /**
     * Login API - Authenticate and get token
     */
    async login(): Promise<RiyaLoginResponse> {
        try {
            const requestPayload: RiyaLoginRequest = {
                AgentInfo: this.agentInfo
            };

            const response = await this.axiosInstance.post<RiyaLoginResponse>(
                "/Login",
                requestPayload
            );

            const data = response.data;

            // Store token if login successful
            if (data.ResponseStatus === "Success" && data.Token) {
                this.token = data.Token;
                console.log("Riya Login Successful - Token stored");
            }

            return data;
        } catch (error: any) {
            console.error("Riya Login Error:", error.message);
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    /**
     * Availability API - Search for flights
     */
    async availability(searchParams: {
        origin: string;
        destination: string;
        departureDate: string;
        adultCount?: number;
        childCount?: number;
        infantCount?: number;
        tripType?: string;
        returnDate?: string;
    }): Promise<RiyaAvailabilityResponse> {
        try {
            // Ensure we have a token
            if (!this.token) {
                await this.login();
            }

            const requestPayload: RiyaAvailabilityRequest = {
                AgentInfo: this.agentInfo,
                SegmentInfo: {
                    BaseOrigin: searchParams.origin,
                    BaseDestination: searchParams.destination,
                    TripType: searchParams.tripType || "O",
                    AdultCount: String(searchParams.adultCount || 1),
                    ChildCount: String(searchParams.childCount || 0),
                    InfantCount: String(searchParams.infantCount || 0),
                    DepartureDate: searchParams.departureDate,
                    ReturnDate: searchParams.returnDate
                }
            };

            const response = await this.axiosInstance.post<RiyaAvailabilityResponse>(
                "/Availability",
                requestPayload,
                {
                    headers: {
                        TOKEN: this.token!
                    }
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("Riya Availability Error:", error.message);
            throw new Error(`Availability search failed: ${error.message}`);
        }
    }

    /**
     * Pricing API - Get pricing details for selected flight
     */
    async pricing(pricingData: {
        origin: string;
        destination: string;
        tripType: string;
        adultCount: number;
        childCount: number;
        infantCount: number;
        trackId: string;
        itineraryInfo: Array<{
            flightDetails: Array<{
                flightId: string;
                flightNumber: string;
                origin: string;
                destination: string;
                departureDateTime: string;
                arrivalDateTime: string;
            }>;
            baseAmount: string;
            grossAmount: string;
        }>;
    }): Promise<RiyaPricingResponse> {
        try {
            // Ensure we have a token
            if (!this.token) {
                await this.login();
            }

            const requestPayload: RiyaPricingRequest = {
                AgentInfo: this.agentInfo,
                SegmentInfo: {
                    BaseOrigin: pricingData.origin,
                    BaseDestination: pricingData.destination,
                    TripType: pricingData.tripType,
                    AdultCount: String(pricingData.adultCount),
                    ChildCount: String(pricingData.childCount),
                    InfantCount: String(pricingData.infantCount)
                },
                Trackid: pricingData.trackId,
                ItineraryInfo: pricingData.itineraryInfo.map(item => ({
                    FlightDetails: item.flightDetails.map(flight => ({
                        FlightID: flight.flightId,
                        FlightNumber: flight.flightNumber,
                        Origin: flight.origin,
                        Destination: flight.destination,
                        DepartureDateTime: flight.departureDateTime,
                        ArrivalDateTime: flight.arrivalDateTime
                    })),
                    BaseAmount: item.baseAmount,
                    GrossAmount: item.grossAmount
                }))
            };

            const response = await this.axiosInstance.post<RiyaPricingResponse>(
                "/Pricing",
                requestPayload,
                {
                    headers: {
                        TOKEN: this.token!
                    }
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("Riya Pricing Error:", error.message);
            throw new Error(`Pricing request failed: ${error.message}`);
        }
    }

    /**
     * Booking API - Create a flight booking
     */
    async booking(bookingData: RiyaBookingRequest): Promise<RiyaBookingResponse> {
        try {
            // Ensure we have a token
            if (!this.token) {
                await this.login();
            }

            // Add agent info to booking request
            const requestPayload = {
                ...bookingData,
                AgentInfo: this.agentInfo
            };

            const response = await this.axiosInstance.post<RiyaBookingResponse>(
                "/Booking",
                requestPayload,
                {
                    headers: {
                        TOKEN: this.token!
                    }
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("Riya Booking Error:", error.message);
            throw new Error(`Booking failed: ${error.message}`);
        }
    }
}
