const nodemailer = require("nodemailer");
require('dotenv').config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
  auth: {
    user: process.env.MAILER_USER,        // Your Gmail address
    pass: process.env.MAILER_PASS          // Your App Password (16-character code)
  }
})

module.exports = {transporter};