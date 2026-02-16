export interface Employee {
    id: string;
    initials: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    joined: string;
    role: string;
    totalTrips: number;
    pendingTrips: number;
    totalSpent: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export const EMPLOYEES_TABLE = process.env.EMPLOYEES_TABLE || "EmployeesTable";
