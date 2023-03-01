const validator = require("validator");
const validateUpdateCheck = (req, res, next) => {
  const { previousName, newName, url, protocol } = req.body;

  if (!previousName || !url || !protocol || !newName) {
    res.status(400).json({
      message: "Please enter previousName, newName, url, and protocol",
      success: false,
    });
    return;
  }
  if (!validator.isURL(url)) {
    res
      .status(400)
      .json({ message: "Please enter a valid url", success: false });
    return;
  }
  if (
    !(
      protocol.toLowerCase() === "http" ||
      protocol.toLowerCase() === "https" ||
      protocol.toLowerCase() === "tcp"
    )
  ) {
    res
      .status(400)
      .json({
        message: "Available protocols are [HTTP, HTTPS, TCP]",
        success: false,
      });
    return;
  }
  next();
};

module.exports = validateUpdateCheck;
