const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post("/send", (req, res) => {
const {fullName, email, contact, message} = req.body

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure: false,
    auth:{
        user: process.env.USER,
        pass: process.env.PASS,
    }
})

const mailOptions = {
    from: `${email}`,
    to: "vincentkesari@gmail.com",
    subject: `Portfolio contact from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`,
  };


const sendMail = async (transporter, mailOptions) => {
    try{
        await transporter.sendMail(mailOptions);
        console.log("email has been sent")
    } catch (error) {
        console.log(error);
    }
}  

sendMail(transporter, mailOptions)
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });