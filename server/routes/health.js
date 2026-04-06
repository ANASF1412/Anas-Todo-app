import express from "express";

const router = express.Router();

// Health check endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Liveness check (for Kubernetes, Vercel, etc.)
router.get("/live", (req, res) => {
  res.status(200).json({ status: "alive" });
});

// Readiness check
router.get("/ready", (req, res) => {
  res.status(200).json({ status: "ready" });
});

export default router;
