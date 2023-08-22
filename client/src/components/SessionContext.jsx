import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
	const [user, setUser] = useState(null);
    const navigate = useNavigate();

	useEffect(() => {
		// Check if user data is in localStorage
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const login = (userData) => {
		// Store user data in localStorage
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
	};

	const logout = () => {
		// Remove user data from localStorage
		localStorage.removeItem("user");
		setUser(null);
        navigate("/account/login");
	};

	return (
		<SessionContext.Provider value={{ user, login, logout }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSession = () => {
	return useContext(SessionContext);
};
