import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

// Direct route registration
app.use("/auth", authRoutes);
app.get("/health", (_req, res) => {
  res.send("OK");
});

export default app;
