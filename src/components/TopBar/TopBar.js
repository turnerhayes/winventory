import React from "react";
import PropTypes from "prop-types";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";

export default function TopBar({ children }) {
	return (
		<AppBar>
			<Toolbar>
				{children}
			</Toolbar>
		</AppBar>
	);
}

TopBar.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};
