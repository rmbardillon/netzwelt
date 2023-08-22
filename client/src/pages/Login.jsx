import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const credentials = {
		username,
		password,
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:3000/login", credentials)
			.then((response) => {
				if (response.data.message !== "Invalid username or password.") {
					navigate("/home/index");
				} else {
					setError("Invalid username or password");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="container">
			<form className="form-container">
				<h1>Login</h1>
				<input
					type="text"
					placeholder="Username"
					onChange={(e) => setUsername(e.target.value)}
					autoFocus
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" onClick={handleLogin} value="submit" />
				{error && <p>{error}</p>}
			</form>
		</div>
	);
};

export default LoginPage;
