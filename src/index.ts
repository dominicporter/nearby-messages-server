import express from "express";
import bodyParser from "body-parser";
import { startMessageCleanup } from "./messageCleanup";
import { getNearbyMessages, saveMessage } from "./database";

export const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());


// API endpoint to broadcast messages to nearby users
app.post("/broadcast", (req, res) => {
  const { message, latitude, longitude } = req.body;
  if (!message || !latitude || !longitude) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const timestamp = Date.now(); // Current timestamp
  saveMessage(message, latitude, longitude, timestamp);
  res.json({ message: "Message broadcasted successfully" });
});

// API endpoint to get messages nearby a specific location
app.get('/getMessagesNearby', (req, res) => {
  const { latitude, longitude, range } = req.query;
  if (!latitude || !longitude || !range) {
    return res.status(400).json({ error: 'Latitude, longitude, and range are required' });
  }

  // Convert latitude, longitude, and range to numbers
  const lat = parseFloat(latitude as string);
  const lon = parseFloat(longitude as string);
  const maxDistance = parseFloat(range as string) * 1000; // Convert range from km to meters

  const nearbyMessages = getNearbyMessages(lat, lon, maxDistance);
  res.json(nearbyMessages);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  startMessageCleanup(); // Start the message cleanup task
});



