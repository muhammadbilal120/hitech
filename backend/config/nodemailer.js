import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || "bilalrabbani12120@gmail.com",
    pass: process.env.EMAIL_PASS || "nfnr gfmj tdpk yitv",
  },
  logger: true,
  debug: true,
});

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('SMTP Connection Failed:', error);
//   } else {
//     console.log('SMTP Server is ready to send emails.');
//   }
// });

export { transporter };
