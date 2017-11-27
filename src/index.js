import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
// import { history }      from "project/scripts/redux/configure-store";
import getStore         from "./redux/store";
import "./index.css";
import ItemSelectionPage from "./components/ItemSelectionPage";
import ResultsPage from "./containers/ResultsPage";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<BrowserRouter>
		<Provider
			store={getStore()}
		>
			<div>
				<Route
					exact
					path="/"
					component={ItemSelectionPage}
				/>
				<Route
					exact
					path="/results"
					component={ResultsPage}
				/>
			</div>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
