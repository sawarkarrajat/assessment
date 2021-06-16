const nodemailer = require('nodemailer');
const { sEmail, sPass } = require('../configs/mail.config');
module.exports = {
  mailer(body, address, callback) {
    console.log('value of body in node mailer', body);

    if (body) {
      //creating transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: sEmail,
          pass: sPass
        }
      });

      //structuring mail and adding data for verification
      const mailContent = {
        from: sEmail,
        to: body.email,
        subject: 'Security Verification Under Process',
        text: address
      };

      // Sending mail to the user
      transporter
        .sendMail(mailContent)
        .then((data) => {
          console.log('mail sent successfully', data);
          callback(null, data);
        })
        .catch((err) => {
          callback(err);
        });
    }
    // console.log("out of if");
  }
};
