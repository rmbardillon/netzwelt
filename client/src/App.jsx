import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import { SessionProvider } from "./components/SessionContext";

const App = () => {
	return (
		<Router>
			<SessionProvider>
				<Routes>
					<Route path="/" element={<Navigate to="/home/index" />} />
					<Route path="/account/login" element={<Login />} />
					<Route path="/home/index" element={<Home />} />
				</Routes>
			</SessionProvider>
		</Router>
	);
};

export default App;
