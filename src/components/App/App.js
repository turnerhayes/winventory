import React from "react";
import ItemGrid from "../../containers/ItemGrid";
import UserPicker from "../../containers/UserPicker";
import "./App.css";

function App() {
	return (
		<div
			className="wic_app"
		>
			<UserPicker />
			<ItemGrid />
		</div>
	);
}

export default App;
