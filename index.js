import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express  ------------------------------------------------------------
const app = express();
const server = http.createServer(app);

// Middlewares -------------------------------------------------------------
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Time API is running on http://localhost:${PORT}`);
});
