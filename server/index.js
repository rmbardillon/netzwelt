const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/login", (req, res) => {
	axios
		.post(
			"https://netzwelt-devtest.azurewebsites.net/Account/SignIn",
			req.body
		)
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error.response.data);
		});
});

app.get("/territories", (req, res) => {
	axios
		.get("https://netzwelt-devtest.azurewebsites.net/Territories/All")
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
});

app.post("/submit-form", (req, res) => {
	const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>`;

	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "romsky.bardillon@gmail.com",
			pass: "aasgdqkrfxigdtrj",
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	let mailOptions = {
		from: `${req.body.name} <${req.body.email}>`,
		to: "romsky.bardillon@gmail.com",
		subject: "Portfolio Contact Form Message",
		text: "Hello world",
		html: output,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.send(info);
	});
});

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
