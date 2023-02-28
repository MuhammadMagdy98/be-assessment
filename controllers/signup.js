const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const notificationFactory = require("../utils/NotificationFactory");
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "email already exists", success: false });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashedPassword,
      emailVerified: false,
    });
    if (user) {
      const verificationToken = uuidv4();
      user.emailVerificationToken = verificationToken;
      await user.save();
      const emailNotification = new notificationFactory().createNotification("email", {
        receiverEmail: email,
        subject: "Verify your email",
        html: `<a href="http://localhost:3000/verify/${verificationToken}"> Verify your email </a>`,
      });
      emailNotification.send();
      res.status(201).json({
        message:
          "user is created successfully, please verify your email to complete the sign up",
        success: true,
      });
    } else {
      // TODO
      res.status(400).json({ message: "Something went wrong", success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, success: false });
  }
};

module.exports = signup;
