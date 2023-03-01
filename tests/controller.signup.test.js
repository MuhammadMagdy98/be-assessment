const axios = require("axios");

describe("sign up test", () => {

  test("invalid email", async () => {
    try {
      await axios.post("http://localhost:3000/signup", {
        email: "migo111@asd..com",
        password: "Migo101dddd",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toBe("Please enter a valid email");
      expect(err.response.data.success).toBe(false);
    }
  });
  test("3 characters password", async () => {
    try {
      await axios.post("http://localhost:3000/signup", {
        email: "migo111@asd.com",
        password: "123",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toBe("Password should be at least 8 characters");
      expect(err.response.data.success).toBe(false);
    }
  });
  test("empty email and password", async () => {
    try {
      await axios.post("http://localhost:3000/signup", {
        email: "",
        password: "",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
      expect(err.response.data.message).toBe("Please enter an email and password");
      expect(err.response.data.success).toBe(false);
    }
  });
});
