export interface RiyaItineraryFlight {
    Token: string;
    FlightID: string;
    FlightNumber: string;
    Origin: string;
    Destination: string;
    DepartureDateTime: string; // [DD MMM YYYY HH:MM]
    ArrivalDateTime: string;   // [DD MMM YYYY HH:MM]
    PaymentMode: string;       // T- Agent Deposit
    SeatID?: string;
    PaxRefNumber?: number;
    BaggageID?: string;
    MealID?: string;
    OtherSSRID?: string;
}

export interface RiyaPaxDetails {
    PaxRefNumber: number;
    Title: string;
    FirstName: string;
    LastName: string;
    DOB: string;               // [DD/MM/YYYY]
    Gender: string;
    PaxType: string;           // ADT/CHD/INF
    PassportNo?: string;
    PassportExpiry?: string;   // [DD/MM/YYYY]
    PassportIssuedDate?: string; // [DD/MM/YYYY]
    PassportCountryCode?: string;
    InfantRef?: string;
}

export interface RiyaAddressDetails {
    CountryCode: string;
    ContactNumber: string;
    EmailID: string;
}

export interface RiyaGSTInfo {
    GSTNumber: string;
    GSTCompanyName: string;
    GSTAddress: string;
    GSTEmailID: string;
    GSTMobileNumber: string;
}

export interface RiyaBookingRequest {
    AgentID: string;
    TerminalID: string;
    Username: string;
    AppType: string;
    Version: string;
    AdultCount: number;
    ChildCount: number;
    InfantCount: number;
    ItineraryFlightsInfo: RiyaItineraryFlight[];
    PaxDetailsInfo: RiyaPaxDetails[];
    AddressDetails: RiyaAddressDetails;
    GSTInfo?: RiyaGSTInfo;
    TripType: string;              // O-Oneway or R-Roundtrip
    BlockPNR: boolean;
    Faremasking: boolean;
    BaseOrigin: string;
    BaseDestination: string;
    TrackId: string;
}

export interface RiyaBookingResponse {
    success: boolean;
    PNR?: string;
    Message?: string;
    Status?: string;
    rawData?: any;
}
