const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const {v4: uuidv4} = require("uuid");
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({email});
    if (userExists) {
      res.status(400).json({message: "email already exists", success: false});
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
      sendEmail(email, verificationToken);
      res.status(201).json({
        message:
          "user is created successfully, please verify your email to complete the sign up",
        success: true,
      });
    } else {
      // TODO
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err, success: false });
  }
};

module.exports = signup;
