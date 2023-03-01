const axios = require("axios");

describe("verify signup test", () => {
  test("invalid token", async () => {
    try {
      await axios.get("http://localhost:3000/verify/randomToken");
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toBe("Invalid token");
      expect(err.response.data.success).toBe(false);
    }
  });
  
});
