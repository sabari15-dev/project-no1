import express from "express";
import bookingRoutes from "./modules/booking/booking.routes";
import riyaRoutes from "./modules/riya/riya.routes";

const app = express();

app.use(express.json());

// Routes
app.use("/riya", riyaRoutes);
app.use("/providers", bookingRoutes);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", message: "AWS Backend is running and aligned with frontend" });
});

export default app;
