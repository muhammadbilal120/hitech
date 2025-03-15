import express from 'express';
import upload from '../middleware/upload.js';
import { transporter } from '../config/nodemailer.js';

const router = express.Router();

router.post('/', upload.single('attachment'), async (req, res) => {
  const { subject, name, email, phone, message } = req.body;
  const file = req.file;

  if (!subject || !name || !email || !phone || !message) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    const mailOptions = {
      from: email,
      to: 'bilalrabbani12120@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    // console.error('Error while sending email:', error);
    res.status(500).send({
      message: 'Failed to send email.',
      error: error.message,
    });
  }
});

export default router;
