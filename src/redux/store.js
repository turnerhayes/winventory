///* globals require */

/**
 * Configures the Redux store for use on the browser. Separate from configure-store.js both so
 * that configure-store.js could be used server-side (without a DOM reference) and so that other
 * client-side modules can get a reference to the store if needed.
 */

import { /*Map,*/ fromJS } from "immutable";
import configureStore from "./configure-store";

// function importAll(r) {
// 	return Map(r.keys().reduce((images, item) => { images[item.replace("./", "")] = r(item); return images; }, {}));
// }

// const images = importAll(require.context("../images", false, /\.(png|jpe?g|svg)$/i));

// let rank = 1;

const initialState = fromJS({
	users: {
		all: [
			"Tom",
			"Phillip",
			"Jamie",
			"Tessa",
			"Steve",
			"Turner",
			"Debbie",
			"Tita",
			"Harry",
		],
		current: "Tom"
	},
	// inventory: {
	// 	items: images.map(
	// 		(src, name) => Map({
	// 			name,
	// 			imageSource: src,
	// 			ranks: Map({
	// 				Tom: rank,
	// 				Phillip: (rank + 1) % (images.size + 1),
	// 				Jamie: rank++,
	// 			}),
	// 		}),
	// 	),
	// },
});

let store;

export default function getStore() {
	if (!store) {
		store = configureStore(initialState);
	}

	return store;
}
