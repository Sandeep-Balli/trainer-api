const nodemailer = require("nodemailer");

//Generate random unique string for email verification.
exports.randString = () => {
  const len = 8;
  let randStr = "";
  for (let i = 0; i < len; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};

// Mail enter

const senderAddress = "arihantj916@gmail.com";

//Email verification mail controller.
exports.confirmEmail = (email, uniqueString) => {
  const verifyOptions = {
    from: senderAddress,
    to: email,
    subject: "Email Confirmation",
    html: `Press <a href=http://52.91.35.190:8080/verify/${uniqueString}>Here</a> to verify your email. Thanks`,
  };
  // transporter.sendMail(verifyOptions, email, uniqueString, function(err, res){
  //   if(err)
  //     console.log(err);
  //   else
  //     console.log("Message Sent");
  // });
};

// //Reset password OTP mail controller.
exports.sendOtp = (email, otp) => {
  const resetOptions = {
    from: senderAddress,
    to: email,
    subject: "Reset Password",
    html: `<p>Enter the OTP to reset your Password : ${otp} . Thanks</p>`,
  };

  // transporter.sendMail(resetOptions, otp, function(err, res) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("Mesage Sent");
  //   }
  // });
};
