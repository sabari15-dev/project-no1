import { PutCommand, GetCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "../../shared/db/dynamoClient";
import { Booking, BOOKINGS_TABLE } from "./booking.model";
import { v4 as uuidv4 } from "uuid";
import { RiyaProvider } from "../../infrastructure/flight/providers/riya.provider";

export class BookingService {
    static async create(data: Partial<Booking>): Promise<Booking> {
        const timestamp = new Date().toISOString();
        let riyaResponse: any = null;

        // If it's a flight, trigger the Riya API call
        if (data.type === "flight") {
            const riya = new RiyaProvider();
            riyaResponse = await riya.book(data.details);
        }

        const booking: Booking = {
            id: `BOK-${uuidv4().substring(0, 8).toUpperCase()}`,
            empId: data.empId!,
            type: data.type || "flight",
            details: {
                ...data.details,
                pnr: riyaResponse?.PNR || "PENDING",
                providerReference: riyaResponse || {}
            },
            amount: data.amount || 0,
            currency: data.currency || "INR",
            status: riyaResponse?.success ? "Confirmed" : "Failed",
            bookingDate: timestamp,
            travelDate: data.travelDate || timestamp,
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        await dynamoDB.send(new PutCommand({
            TableName: BOOKINGS_TABLE,
            Item: booking,
        }));

        return booking;
    }

    static async getAll(): Promise<Booking[]> {
        const result = await dynamoDB.send(new ScanCommand({
            TableName: BOOKINGS_TABLE,
        }));
        return (result.Items as Booking[]) || [];
    }

    static async getByEmployeeId(empId: string): Promise<Booking[]> {
        const result = await dynamoDB.send(new ScanCommand({
            TableName: BOOKINGS_TABLE,
            FilterExpression: "empId = :empId",
            ExpressionAttributeValues: { ":empId": empId },
        }));
        return (result.Items as Booking[]) || [];
    }
}
