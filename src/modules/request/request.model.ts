export interface BookingRequest {
    id: string;
    initials: string;
    name: string;
    empId: string;
    typeIcon: "flight" | "hotel" | "train" | "bus" | "visa" | "insurance";
    type: string;
    route: string;
    time: string;
    travelDate: string;
    amount: string;
    requested: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt?: string;
    updatedAt?: string;
}

export const REQUESTS_TABLE = process.env.REQUESTS_TABLE || "RequestsTable";
