import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
	const [territories, setTerritories] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:3000/territories")
			.then((response) => {
				setTerritories(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const organizeTerritoriesByRegion = () => {
		const regions = [];
		const territoryMap = {};

		territories.forEach((territory) => {
			territoryMap[territory.id] = territory;
			territory.children = [];
		});

		territories.forEach((territory) => {
			if (territory.parent === null) {
				regions.push(territory);
			} else {
				territoryMap[territory.parent].children.push(territory);
			}
		});

		return regions;
	};

	const renderTerritory = (territory) => (
		<li key={territory.id}>
			{territory.children && territory.children.length > 0 && (
				<span
					className={`caret ${
						expandedTerritories.includes(territory.id)
							? "caret-down"
							: ""
					}`}
					onClick={() => handleToggle(territory.id)}
				>
					{territory.name}
				</span>
			)}
			{!territory.children || territory.children.length === 0 ? (
				<span>{territory.name}</span>
			) : (
				<>
					{territory.children && territory.children.length > 0 && (
						<ul
							className={`nested ${
								expandedTerritories.includes(territory.id)
									? "active"
									: ""
							}`}
						>
							{territory.children.map(renderTerritory)}
						</ul>
					)}
				</>
			)}
		</li>
	);

	const renderRegions = () => {
		const regions = organizeTerritoriesByRegion();
		return regions.map(renderTerritory);
	};
	const [expandedTerritories, setExpandedTerritories] = useState([]);

	const handleToggle = (territoryId) => {
		setExpandedTerritories((prevExpanded) =>
			prevExpanded.includes(territoryId)
				? prevExpanded.filter((id) => id !== territoryId)
				: [...prevExpanded, territoryId]
		);
	};

    const logout = () => {
        navigate("/account/login");
    }

	return (
		<div className="home-container">
			<button onClick={logout}>Logout</button>
			<h2>Territories</h2>
			<ul id="myUL">{renderRegions()}</ul>
		</div>
	);
};

export default Home;
