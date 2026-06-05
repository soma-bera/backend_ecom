// Create a transporter - Configure your SMTP server or another supported transport method.

const dotenv=require('dotenv').config();
const nodemailer=require("nodemailer");
async function mail(email,username){
const transporter=nodemailer.createTransport(
    {
        service:"gmail",
        auth:
        {
            user:process.env.GMAILUSER,
            pass:process.env.GMAILPASS
        }
    }
)
// Compose your message - Define the sender, recipient(s), subject, and content.
// Send the email - Call transporter.sendMail() with your message options.
  const message= {
    from: process.env.GMAILUSER, // sender address
    to: email, // list of recipients
    subject: "account creation", // subject line
    text: "registration", // plain text body
    html: "<b>`(${username} successfully created)`</b>", // HTML body
  };
  await transporter.sendMail(message)
  console.log("email sent")
}

 module.exports=mail;

