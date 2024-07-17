const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const port = 5000;
const app = express();
app.use(bodyParser.json());

// Configure CORS
const corsOptions = {
  origin: '*', // Allow your frontend domain
  methods: '*', // Allow these methods
  allowedHeaders: '*', // Allow these headers
};

app.use(cors(corsOptions));

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
