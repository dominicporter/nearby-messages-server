import { Messages } from "./types";

const MESSAGE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const messages: Messages = {};

export const saveMessage = (
  message: string,
  latitude: number,
  longitude: number,
  timestamp: number
) => {
  messages[timestamp] = {
    timestamp: new Date(timestamp).toISOString(),
    message,
    latitude,
    longitude,
  };
  console.log(messages);
};

export const cleanupMessages = () => {
  const currentTime = Date.now();
  Object.keys(messages).forEach((ts) => {
    const timestamp = parseInt(ts);
    if (currentTime - timestamp > MESSAGE_EXPIRATION_TIME) {
      delete messages[timestamp];
    }
  });
};

export const getNearbyMessages = (
  latitude: number,
  longitude: number,
  maxDistance: number
) => {
  const nearbyMessages = Object.values(messages).filter((message) => {
    const distance = calculateDistance(
      latitude,
      longitude,
      message.latitude,
      message.longitude
    );
    return distance <= maxDistance;
  });

  return nearbyMessages;
};

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Implementation of haversine formula (you can replace with your own implementation)
  // For simplicity, assuming Earth's radius is 6371 km
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
