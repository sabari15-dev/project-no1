import { PutCommand, GetCommand, ScanCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import dynamoDB from "../../shared/db/dynamoClient";
import { Employee, EMPLOYEES_TABLE } from "./employee.model";
import { v4 as uuidv4 } from "uuid";

export class EmployeeService {
    static async create(data: Partial<Employee>): Promise<Employee> {
        const timestamp = new Date().toISOString();
        const employee: Employee = {
            id: data.id || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
            initials: data.initials || this.getInitials(data.name || ""),
            name: data.name!,
            email: data.email!,
            phone: data.phone || "",
            department: data.department!,
            position: data.position!,
            joined: data.joined || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            role: data.role || data.position!,
            totalTrips: data.totalTrips || 0,
            pendingTrips: data.pendingTrips || 0,
            totalSpent: data.totalSpent || "₹0",
            status: data.status || "Active",
            createdAt: timestamp,
            updatedAt: timestamp,
        };

        await dynamoDB.send(new PutCommand({
            TableName: EMPLOYEES_TABLE,
            Item: employee,
        }));

        return employee;
    }

    static async getAll(): Promise<Employee[]> {
        const result = await dynamoDB.send(new ScanCommand({
            TableName: EMPLOYEES_TABLE,
        }));
        return (result.Items as Employee[]) || [];
    }

    static async getById(id: string): Promise<Employee | null> {
        const result = await dynamoDB.send(new GetCommand({
            TableName: EMPLOYEES_TABLE,
            Key: { id },
        }));
        return (result.Item as Employee) || null;
    }

    static async delete(id: string): Promise<void> {
        await dynamoDB.send(new DeleteCommand({
            TableName: EMPLOYEES_TABLE,
            Key: { id },
        }));
    }

    private static getInitials(name: string): string {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    }
}
