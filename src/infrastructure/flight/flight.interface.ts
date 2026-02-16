export interface FlightSearchQuery {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
}

export interface FlightResult {
    id: string;
    airline: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    currency: string;
    provider: string;
}

export interface IFlightProvider {
    name: string;

    // Auth
    login(): Promise<any>;

    // Search & Pricing
    availability(query: FlightSearchQuery): Promise<FlightResult[]>;
    getFareRules(flightId: string): Promise<any>;
    pricing(flightId: string): Promise<any>;

    // Ancillaries
    getSeatMap(flightId: string): Promise<any>;
    getSSR(flightId: string): Promise<any>;
    addSSR(bookingId: string, ssrData: any): Promise<any>;

    // Booking & Ticketing
    book(bookingData: any): Promise<any>;
    issueTicket(bookingId: string): Promise<any>;
    holdCancel(bookingId: string): Promise<any>;

    // Post-Booking
    retrieveBooking(pnr: string): Promise<any>;
    trackStatus(pnr: string): Promise<any>;
    cancel(pnr: string): Promise<any>;

    // Reschedule
    rescheduleAvail(pnr: string, newDate: string): Promise<any>;
    reschedule(pnr: string, rescheduleData: any): Promise<any>;

    // Account
    getBalance(): Promise<any>;
}
