// Riya API Request and Response Interfaces

// ============ Login API ============
export interface RiyaLoginRequest {
    AgentInfo: {
        AgentId: string;
        TerminalId: string;
        UserName: string;
        AppType: string;
        Version: string;
    };
}

export interface RiyaLoginResponse {
    ResponseStatus: string;
    Token?: string;
    ErrorMessage?: string;
}

// ============ Availability API ============
export interface RiyaAvailabilityRequest {
    AgentInfo: {
        AgentId: string;
        TerminalId: string;
        UserName: string;
        AppType: string;
        Version: string;
    };
    SegmentInfo: {
        BaseOrigin: string;
        BaseDestination: string;
        TripType: string;
        AdultCount: string;
        ChildCount: string;
        InfantCount: string;
        DepartureDate: string; // Format: "DD MMM YYYY"
        ReturnDate?: string;   // For round trip
    };
}

export interface RiyaFlightDetail {
    FlightID: string;
    FlightNumber: string;
    Origin: string;
    Destination: string;
    DepartureDateTime: string;
    ArrivalDateTime: string;
    BaseAmount: string;
    GrossAmount: string;
    Stock?: string;
    DepartureTerminal?: string;
    ArrivalTerminal?: string;
}

export interface RiyaAvailabilityResponse {
    ResponseStatus: string;
    Trackid?: string;
    FlightDetails?: RiyaFlightDetail[];
    ErrorMessage?: string;
}

// ============ Pricing API ============
export interface RiyaPricingRequest {
    AgentInfo: {
        AgentId: string;
        TerminalId: string;
        UserName: string;
        AppType: string;
        Version: string;
    };
    SegmentInfo: {
        BaseOrigin: string;
        BaseDestination: string;
        TripType: string;
        AdultCount: string;
        ChildCount: string;
        InfantCount: string;
    };
    Trackid: string;
    ItineraryInfo: Array<{
        FlightDetails: Array<{
            FlightID: string;
            FlightNumber: string;
            Origin: string;
            Destination: string;
            DepartureDateTime: string;
            ArrivalDateTime: string;
        }>;
        BaseAmount: string;
        GrossAmount: string;
    }>;
}

export interface RiyaPricingResponse {
    ResponseStatus: string;
    PricingDetails?: {
        BaseAmount: string;
        GrossAmount: string;
        TaxBreakup?: any;
    };
    ErrorMessage?: string;
}

// ============ Booking API ============
export interface RiyaFlightInfo {
    FlightID: string;
    Stock: string;
    FlightNumber: string;
    Origin: string;
    Destination: string;
    DepartureTerminal: string;
    ArrivalTerminal: string;
    DepartureDateTime: string;
    ArrivalDateTime: string;
}

export interface RiyaItineraryFlightInfo {
    Token: string;
    FlighstInfo: RiyaFlightInfo[];
    PaymentMode: string;
    SeatsSSRInfo: any[];
    BaggSSRInfo: any[];
    MealsSSRInfo: any[];
    OtherSSRInfo: any[];
    PaymentInfo: Array<{
        TotalAmount: string;
    }>;
}

export interface RiyaPaxDetails {
    PaxRefNumber: string;
    Title: string;
    FirstName: string;
    LastName: string;
    DOB: string;           // Format: DD/MM/YYYY
    Gender: string;
    PaxType: string;       // ADT, CHD, INF
    PassportNo?: string;
    PassportExpiry?: string;
    PassportIssuedDate?: string;
    PassportCountryCode?: string;
    InfantRef?: string;
}

export interface RiyaAddressDetails {
    CountryCode: string;
    ContactNumber: string;
    EmailID: string;
}

export interface RiyaBookingRequest {
    AgentInfo: {
        AgentId: string;
        TerminalId: string;
        UserName: string;
        AppType: string;
        Version: string;
    };
    AdultCount: number;
    ChildCount: number;
    InfantCount: number;
    ItineraryFlightsInfo: RiyaItineraryFlightInfo[];
    PaxDetailsInfo: RiyaPaxDetails[];
    AddressDetails: RiyaAddressDetails;
    TripType: string;
    BlockPNR: string;
    BaseOrigin: string;
    BaseDestination: string;
    TrackId: string;
}

export interface RiyaBookingResponse {
    ResponseStatus: string;
    PNR?: string;
    Status?: string;
    ErrorMessage?: string;
    BookingDetails?: any;
}
