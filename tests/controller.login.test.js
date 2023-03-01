const axios = require("axios");
describe("Login test", () => {
  test("login with empty email and password", async () => {
    try {
      await axios.post("http://localhost:3000/login", {
        email: "",
        password: "",
      });
    } catch (err) {
      expect(err.response.status).toBe(401);
      expect(err.response.data.message).toBe("Please enter email and password");
      expect(err.response.data.success).toBe(false);
    }
  });
  
});
