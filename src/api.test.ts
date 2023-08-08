import request from "supertest";
import { app } from "./index"; // Assuming your Express app is exported as "app"

describe("API Endpoints", () => {
  // Test data
  const userLocation = { latitude: 37.7749, longitude: -122.4194 }; // San Francisco

  describe("/broadcast", () => {
    it("should broadcast a message with a location", async () => {
      const response = await request(app)
        .post("/broadcast")
        .send({ message: "Hello, nearby users!", ...userLocation });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Message broadcasted successfully",
      });
    });

    it("should not broadcast a message without required data", async () => {
      const response = await request(app).post("/broadcast").send({});

      expect(response.status).toBe(400);
    });
  });

  describe("getMessagesNearby", () => {
    it("should get messages nearby a specific location", async () => {
      // Assuming these coordinates are within the defined RADIUS_THRESHOLD
      const latitude = 37.7749;
      const longitude = -122.4194;

      const response = await request(app)
        .get("/getMessagesNearby")
        .query({ latitude, longitude });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(1); // Since we don't have messages in the test setup

      // Add more assertions based on your expected behavior and test data
    });

    it("should return an error for missing latitude or longitude", async () => {
      const response = await request(app).get("/getMessagesNearby");

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Latitude and longitude are required");
    });
  });
});
