const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('success', { name });
  } catch (error) {
    res.send('Error sending email: ' + error);
  }
};
