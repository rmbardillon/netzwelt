const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
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

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
