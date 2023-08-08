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
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  // Convert latitude and longitude to numbers
  const lat = parseFloat(latitude as string);
  const lon = parseFloat(longitude as string);

  // Define a radius threshold (adjust as needed)
  const nearbyMessages = getNearbyMessages(lat, lon);

  res.json(nearbyMessages);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  startMessageCleanup(); // Start the message cleanup task
});



