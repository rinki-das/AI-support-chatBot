import express from "express";
import chatRoutes from "./routes/chat.routes";

export const app = express();

// Middlewares
app.use(express.json());

// Basic health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/chat", chatRoutes);
