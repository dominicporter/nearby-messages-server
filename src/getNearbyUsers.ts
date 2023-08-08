import { Users } from "./types";

// Function to determine nearby users based on their locations
export const getNearbyUsers = (userLocation: {
    latitude: number;
    longitude: number;
  }, users: Users ) => {
    // For simplicity, let's assume users within 1-degree latitude/longitude range are nearby
    const nearbyUsers: string[] = [];
    for (const [id, location] of Object.entries(users)) {
      if (
        Math.abs(location.latitude - userLocation.latitude) <= 1 &&
        Math.abs(location.longitude - userLocation.longitude) <= 1
      ) {
        nearbyUsers.push(id);
      }
    }
    return nearbyUsers;
  };