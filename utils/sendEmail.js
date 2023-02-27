const nodeMailer = require("nodemailer");


const sendEmail = async (receiverEmail, verificationToken) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    }
  });

  const sendInfo = await transporter.sendMail({ 
    from: process.env.SENDER_EMAIL,
    to: receiverEmail,
    subject: "uptime monitoring email verification",
    text: "Click the link below to verify your email",
    html: `<a href="http://localhost:3000/verify/${verificationToken}"> Verify your email </a>`
  });

  if (sendInfo) {
    console.log("Email is sent successfully");
  } else {
    console.log("something went wrong");
  }
}

module.exports = sendEmail;