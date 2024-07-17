const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const port = 5000;
const app = express();
app.use(bodyParser.json());

// Enable All CORS Requests
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://portfolio-two-lake-84.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.send();
});

app.post("/send", (req, res) => {
  const { fullName, email, contact, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    }
  });

  const mailOptions = {
    from: `${email}`,
    to: "vincentkesari@gmail.com",
    subject: `Portfolio contact from ${fullName}`,
    text: `Name: ${fullName}\nEmail: ${email}\nContact: ${contact}\nMessage: ${message}`,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
      console.log("Email has been sent");
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    }
  };

  sendMail(transporter, mailOptions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
