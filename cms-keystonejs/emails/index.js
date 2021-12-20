const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const { MAIL_SERVER_CONFIG } = require("../config");

// Generate test SMTP service account from ethereal.email
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(MAIL_SERVER_CONFIG);

transporter.verify(function (error, success) {
  if (error) {
    console.log("\nTransporter error: ", error);
  } else {
    console.log("\nServer is ready to take our messages");
  }
});

function getMailContent(fileName, data = {}) {
  debugger;
  console.log(__dirname);
  const htmlFileContent = fs
    .readFileSync(path.join(__dirname, `${fileName}.html`))
    .toString();

  let updatedFileContent = htmlFileContent;
  Object.keys(data).forEach((key) => {
    // Data is passed to HTML through variables with prefix ___  (triple underscore)
    const htmlKey = new RegExp(`___${key.toUpperCase()}`, "g");
    updatedFileContent = updatedFileContent.replace(htmlKey, data[key]);
  });
  return updatedFileContent;
}

// async..await is not allowed in global scope, must use a wrapper
function main() {
  // send mail with defined transport object
  return async (customerInfo, template) => {
    const htmlContent = getMailContent(template, customerInfo);

    const playload = {
      from: MAIL_SERVER_CONFIG.auth.user,
      to: "kimngancdcn@gmail.com",
      subject:
        "[Napa-Solution] A partner wants to connect: " + customerInfo.name,
      html: htmlContent,
    };

    const info = await transporter.sendMail(playload, (error, info) => {
      if (error) {
        console.log("Mail sent error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return info;
  };
}

module.exports = {
  reply: main(),
};
