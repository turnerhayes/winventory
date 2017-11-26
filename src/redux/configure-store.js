// process.env.[FOO] is used by webpack during the build, and will be replaced with a constant
/* globals process */

import Immutable               from "immutable";
import {
	compose,
	createStore,
	applyMiddleware
}                              from "redux";
import thunkMiddleware         from "redux-thunk";
import promiseMiddleware       from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware }    from "react-router-redux";
import createHistory           from "history/createBrowserHistory";
import rootReducer             from "./reducers";
import * as actionCreators     from "./actions";

export const history = createHistory();

const middlewares = [
	thunkMiddleware,
	promiseMiddleware,
	routerMiddleware(history),
];

let composer = compose;

if (process.env.NODE_ENV === "development") {
	composer = composeWithDevTools({
		actionCreators,
		serialize: {
			immutable: Immutable,
		},
	});
}

const composedEnhancers = composer(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
	let store = createStore(
		rootReducer,
		initialState || Immutable.Map(),
		composedEnhancers
	);

	return store;
}
