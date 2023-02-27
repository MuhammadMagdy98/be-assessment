const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(401)
      .json({ message: "Please enter email and password", success: false });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(401)
        .json({ message: "Email or password is incorrect", success: false });
      return;
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res
        .status(401)
        .json({ message: "Email or password is incorrect", success: false });
      return;
    }
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "2h" });
    res
      .status(200)
      .json({ message: "Use this token for further requests", token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = login;