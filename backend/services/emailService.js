import { sendMail } from "../config/nodemailer";

const sendEmail = async ({ subject, name, email, message, file }) => {
  // const mailOptions = {
  //   from: email,
  //   to:"mute.official07@gmail.com",
  //   subject: subject,
  //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  //   attachments: file
  //     ? [
  //         {
  //           filename: file.originalname,
  //           content: file.buffer,
  //         },
  //       ]
  //     : [],
  // };

  // await sendMail(mailOptions);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bilalrabbani12120@gmail.com",
      pass: "nfnr gfmj tdpk yitv", // ENV file ma store karo!
    },
  });

  let mailOptions = {
    // from: order.email,
    to: "bilalrabbani12120@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    attachments: file
      ? [
        {
          filename: file.originalname,
          content: file.buffer,
        },
      ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${mailOptions}`);
  } catch (emailError) {
    console.log("Email Error: ", emailError);
  }

  res.json({ success: true, message: "Email sent successfully" });
};

export default { sendEmail };
