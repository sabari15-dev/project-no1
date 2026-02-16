import express from "express";
import employeeRoutes from "./modules/employee/employee.routes";
import requestRoutes from "./modules/request/request.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import authRoutes from "./modules/auth/auth.routes";
import { authMiddleware } from "./shared/middleware/auth.middleware";

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/employees", authMiddleware, employeeRoutes);
app.use("/requests", requestRoutes);
app.use("/bookings", bookingRoutes);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", message: "AWS Backend is running and aligned with frontend" });
});

export default app;
