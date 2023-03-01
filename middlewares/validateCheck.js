const validator = require("validator");
const validateCheck = (req, res, next) => {
  const { name, url, protocol } = req.body;

  if (!name || !url || !protocol) {
    res.status(400).json({
      message: "Please enter name, url, and protocol",
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

module.exports = validateCheck;
