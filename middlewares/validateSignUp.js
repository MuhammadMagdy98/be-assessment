const validator = require("validator");
const validateSignUp = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please enter an email and password",
      success: false,
    });
    return;
  }

  if (!validator.isEmail(email)) {
    res
      .status(400)
      .json({ message: "Please enter a valid email", success: false });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      message: "Password should be at least 8 characters",
      success: false,
    });
    return;
  }
  next();
};

module.exports = validateSignUp;
