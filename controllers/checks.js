const Check = require("../models/check");
const User = require("../models/user");
const Report = require("../models/report");
const makeRequest = require("../utils/makeRequest");
const addCheck = async (req, res) => {
  const { name, url, protocol, interval } = req.body;
  if (!name || !url) {
    res
      .status(400)
      .json({ message: "Please enter valid name and url", success: false });
    return;
  }
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
    const tenMinutesInMilliseconds = 1000 * 60 * 10;
    
    const check = new Check({
      name: name,
      url: url,
      userId: req.user._id,
      interval: interval ? interval * 1000 : tenMinutesInMilliseconds,
    });

    await check.save();
    console.log(check);
    makeRequest(check);

    res.status(200).json({ message: "Check is done", success: true });
  } catch (err) {
    console.log(err);
  }
};

const removeCheck = async (req, res) => {
  const { name } = req.body;
  try {
    const checkId = await Check.findOne({name});
    await Check.deleteOne({ name });
    await Report.deleteOne({checkId});
    res
      .status(201)
      .json({ message: "Check is removed successfully", success: true });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
};

const getCheck = async (req, res) => {};

const updateCheck = async (req, res) => {};
module.exports = {
  addCheck,
  removeCheck
}
