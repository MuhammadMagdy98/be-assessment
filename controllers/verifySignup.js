const User = require("../models/user");
const verifySignup = async (req, res) => {
  const token = req.params.token;
  if (!token) {
    res.status(400).json({ message: "Invalid token", success: false });
    return;
  }
  try {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      res.status(400).json({ message: "Invalid token", success: false });
      return;
    }
    user.emailVerified = true;
    user.emailVerificationToken = "";
    await user.save();
    res
      .status(200)
      .json({ message: "Email is verified, please login", success: true });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

module.exports = verifySignup;