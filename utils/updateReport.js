const Report = require("../models/report");
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
    report.status = status;
    report.responseTimeSum += responseTime;
    report.outages += (status === "down" ? 1 : 0);
    await report.save();
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
