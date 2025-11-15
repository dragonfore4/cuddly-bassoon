import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = Number(process.env.PORT) || 8080;

app.get("/", (req: Request, res: Response) => {
  console.log("test")
  const appName = process.env.APP_NAME ?? "UnknownApp";
  console.log(`App Name: ${appName}`);
  res.send("Hello World kub!");
});

// Health endpoint - simple liveness
app.get("/health", (req: Request, res: Response) => {
  console.log("health check hit")
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Details endpoint - returns basic app metadata
app.get("/details", (req: Request, res: Response) => {
  // Short response: read one environment variable (APP_NAME)
  const appName = process.env.APP_NAME ?? "Not defined";
  res.json({ appName });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});