const Check = require("../models/check");
const Report = require("../models/report");
const getReport = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).json({ message: "name is required", success: false });
    return;
  }
  try {
    const check = await Check.findOne({ name, userId: req.user._id });
    const report = await Report.findOne({ checkId: check._id });
    res.status(200).json({report, success: true});
  } catch (err) {
    res.status(400).json({message: "report not found", success: false});
  }
};

module.exports = getReport;