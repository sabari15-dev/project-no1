export interface Booking {
    id: string;
    empId: string;
    type: "flight" | "hotel" | "train" | "bus" | "holiday" | "visa" | "insurance";
    details: any; // Flexible object for different booking types
    amount: number;
    currency: string;
    status: "Confirmed" | "Cancelled" | "Pending";
    bookingDate: string;
    travelDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export const BOOKINGS_TABLE = process.env.BOOKINGS_TABLE || "BookingsTable";
