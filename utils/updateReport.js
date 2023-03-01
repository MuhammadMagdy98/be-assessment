const Report = require("../models/report");
const User = require("../models/user");
const notificationFactory = require("./NotificationFactory");
const updateReport = async ({ status, responseTime, check }) => {
  try {
    let report = await Report.findOne({ checkId: check._id });
    if (!report) {
      // first time
      report = await new Report({
        checkId: check._id,
        status: status,
        availability: 100,
        outages: status === "down",
        downTime: 0,
        upTime: 10 * 60,
        responseTime,
        responseTimeSum: responseTime,
        checkCount: 1,
      });
      report.history.push({createdAt: new Date(), status});
      await report.save();
      return;
    }

    report.checkCount++;
    if (report.status !== status) {
      // it was up then down or vice versa we have to send notification to email
      const user = await User.findOne({_id: check.userId});

      const emailNotification = new notificationFactory().createNotification("email", {
        receiverEmail: email,
        subject: `${check.url} is ${status}`,
        html: `<p style="color:${status === "up" ? "green" : "red"}> ${check.url} is $status} </p>`,
      });
      emailNotification.send();

    }
    report.status = status;
    report.responseTimeSum += responseTime;
    report.outages += (status === "down" ? 1 : 0);
    report.upTime += (status === "up" ? 10 * 60: 0);
    report.downTime += (status === "down" ? 10 * 60 : 0);
    const upTimeCount = report.checkCount - report.outages;
    report.availability = Math.round((upTimeCount / report.checkCount) * 100);
    report.responseTime = Math.round(report.responseTimeSum / report.checkCount);
    report.history.push({createdAt: new Date(), status});
    await report.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = updateReport;
