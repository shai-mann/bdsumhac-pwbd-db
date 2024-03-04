import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
  },
});

export const sendEmail = (email, facilitiesInfo, name, explanation) => {
  let text = `Updates: ${facilitiesInfo.length} edits were made by ${
    name ? `${name} using '${email}'` : email
  }. See the edits below:\n=====================\n`;

  facilitiesInfo.forEach((info, i) => {
    text += `${i + 1}) ${info.name} (id: ${info.id}) is now marked as PWBD: ${info.pwbd}\n`;
  })

  if (explanation) {
    text += `\n=====================\nExplanation given: \n${explanation}`;
  }

  const mailOptions = {
    from: process.env.MAILER_USERNAME,
    to: process.env.MAILER_TARGET,
    subject: "[Facilities Database] An update was just made!",
    text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
