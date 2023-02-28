class Notification {
  send() {}
}

class EmailNotification extends Notification {
  constructor(receiverEmail, subject, html) {
    super();
    this.receiverEmail = receiverEmail;
    this.subject = subject;
    this.html = html;
  }

  async send() {
    const nodeMailer = require("nodemailer");
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    try {
      const sendInfo = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: this.receiverEmail,
        subject: this.subject,
        html: this.html,
      });
      console.log("email is sent successfully");
    } catch (err) {
      console.log(err);
      console.log("something went wrong");
    }
  }
}

class NotificationFactory {
  createNotification(type, options) {
    switch(type) {
      case "email":
        return new EmailNotification(options.receiverEmail, options.subject, options.html);
      default:
        console.log("Invalid notification errror");
    }
  }
}

module.exports = NotificationFactory;
