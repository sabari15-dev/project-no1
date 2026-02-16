import { PutCommand, GetCommand, ScanCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "../../shared/db/dynamoClient";
import { BookingRequest, REQUESTS_TABLE } from "./request.model";

export class RequestService {
    static async create(data: Partial<BookingRequest>): Promise<BookingRequest> {
        const timestamp = new Date().toISOString();
        const request: BookingRequest = {
            id: `REQ-${Math.floor(100 + Math.random() * 899)}`,
            initials: data.initials || "??",
            name: data.name!,
            empId: data.empId!,
            typeIcon: data.typeIcon || "flight",
            type: data.type || "Flight",
            route: data.route || "Unknown",
            time: data.time || "N/A",
            travelDate: data.travelDate || new Date().toDateString(),
            amount: data.amount || "₹0",
            requested: "Just now",
            status: "Pending",
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        await dynamoDB.send(new PutCommand({
            TableName: REQUESTS_TABLE,
            Item: request,
        }));

        return request;
    }

    static async getAll(): Promise<BookingRequest[]> {
        const result = await dynamoDB.send(new ScanCommand({
            TableName: REQUESTS_TABLE,
        }));
        return (result.Items as BookingRequest[]) || [];
    }

    static async updateStatus(id: string, status: "Approved" | "Rejected"): Promise<void> {
        await dynamoDB.send(new UpdateCommand({
            TableName: REQUESTS_TABLE,
            Key: { id },
            UpdateExpression: "set #status = :status, updatedAt = :updatedAt",
            ExpressionAttributeNames: { "#status": "status" },
            ExpressionAttributeValues: {
                ":status": status,
                ":updatedAt": new Date().toISOString(),
            },
        }));
    }
}
