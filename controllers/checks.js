const Check = require("../models/check");
const User = require("../models/user");
const Report = require("../models/report");
const makeRequest = require("../utils/makeRequest");
const validator = require("validator");

const tenMinutesInMilliseconds = 1000 * 60 * 10;

const addCheck = async (req, res) => {
  const { name, url, protocol, interval } = req.body;
  try {
    const urlExists = await Check.findOne({ url });
    if (urlExists) {
      // find the user associated with the url
      const user = await User.findOne({ _id: urlExists.userId });
      if (JSON.stringify(user) === JSON.stringify(req.user)) {
        // if the same url and the same user, there is no point to duplicate it
        res.status(400).json({ message: "url already exists", success: false });
        return;
      }
    }

    const check = new Check({
      name: name,
      url: url,
      protocol: protocol.toUpperCase(),
      userId: req.user._id,
      interval: interval ? interval * 1000 : tenMinutesInMilliseconds,
    });

    
    console.log(check);
    const intervalId = makeRequest(check);
    check.intervalId = intervalId;
    await check.save();

    res.status(200).json({ message: "Check is done", success: true });
  } catch (err) {
    console.log(err);
  }
};

const removeCheck = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "name is required", success: false });
    return;
  }
  try {
    const check = await Check.findOne({ name });
    console.log("removed");
    clearInterval(check.intervalId);
    await Check.deleteOne({ name });
    await Report.deleteOne({ checkId: check._id });
    res
      .status(201)
      .json({ message: "Check is removed successfully", success: true });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

const getCheck = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    res.status(400).json({ message: "name is required", success: false });
    return;
  }
  try {
    const check = await Check.findOne({ name });
    res.status(200).json({ check, success: true });
  } catch (err) {
    res
      .status(400)
      .json({ message: "this name doesn't exist", success: false });
  }
};

const updateCheck = async (req, res) => {
  const { previousName, newName, url, interval, protocol } = req.body;
  if (!previousName || !newName || !url) {
    res.status(400).json({
      message: "Please enter previous name, new name, url and interval",
      success: false,
    });
    return;
  }
  if (interval && !validator.isInt(interval)) {
    res
      .status(400)
      .json({ message: "interval should be a number", success: false });
    return;
  }
  try {
    const checkId = await Check.findOne({ previousName });
    await Check.deleteOne({ previousName });
    await Report.deleteOne({ checkId });
    const updatedCheck = new Check({
      url,
      name: newName,
      protocol,
      interval: interval ? interval * 1000 : tenMinutesInMilliseconds,
      userId: req.user._id,
    });
    await updateCheck.save();

    res
      .status(201)
      .json({ message: "Check is updated successfully", success: true });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};
module.exports = {
  addCheck,
  removeCheck,
  updateCheck,
  getCheck,
};
