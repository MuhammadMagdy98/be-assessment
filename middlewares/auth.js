const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authenticate = async(req, res, next) => {
  const { token } = req.body;
  if (!token) {
    res.status(400).json({ message: "Unauthorized", success: false });
    return;
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken) {
      res.status(400).json({ message: "Unauthorized", success: false });
      return;
    }
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      res.status(400).json({ message: "Unauthorized", success: false });
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Unauthorized", success: false });
    return;
  }
  
};

module.exports = authenticate;
