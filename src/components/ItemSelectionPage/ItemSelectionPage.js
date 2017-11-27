import React from "react";
import TopBar from "../TopBar";
import { Link } from "react-router-dom"; 
import UserPicker from "../../containers/UserPicker";
import ItemGrid from "../../containers/ItemGrid";
import "./ItemSelectionPage.css";

export default function ItemSelectionPage() {
	return (
		<div
			className="wic_item-selection-page"
		>
			<TopBar>
				<Link
					to="/results"
					className="wic_item-selection-page__results-link"
				>Results</Link>
				<UserPicker />
			</TopBar>
			<ItemGrid />
		</div>
	);
}
