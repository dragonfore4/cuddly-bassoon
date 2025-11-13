import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const port = Number(process.env.PORT) || 8080;

app.get("/", (req, res) => {
  console.log("test")
  const appName = process.env.APP_NAME ?? "UnknownApp";
  console.log(`App Name: ${appName}`);
  res.send("Hello World kub!");
});

// Health endpoint - simple liveness
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Details endpoint - returns basic app metadata
app.get("/details", (_req, res) => {
  // Short response: read one environment variable (APP_NAME)
  const appName = process.env.APP_NAME ?? null;
  res.json({ appName });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});