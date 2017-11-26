import { fromJS } from "immutable";
import { OK, MULTIPLE_CHOICES } from "http-status-codes";

export const SET_RANK = "APP/SET_RANK";

export const SETTING_RANK = "APP/SETTING_RANK";

export function setRank({ user, itemID, rank }) {
	return (dispatch) => {
		dispatch({
			type: SETTING_RANK,
			payload: {
				user,
				itemID,
				rank,
			}
		});

		const body = {
			user
		};
		let method;

		if (rank) {
			body.rank = rank;
			method = "PATCH";
		}
		else {
			method = "DELETE";
		}

		dispatch({
			type: SET_RANK,
			payload: fetch(`/api/inventory/${itemID}/ranks`, {
				method,
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(
				() => ({
					user,
					itemID,
					rank,
				})
			),
		});
	};
}

export const FETCHING_INVENTORY = "APP/FETCHING_INVENTORY";

export const FETCHED_INVENTORY = "APP/FETCHED_INVENTORY";

export const FETCH_INVENTORY = "APP/FETCH_INVENTORY";

export function fetchInventory() {
	return (dispatch) => {
		dispatch({
			type: FETCHING_INVENTORY,
		});

		dispatch({
			type: FETCHED_INVENTORY,
			payload: fetch("/api/inventory/").then(
				(response) => {
					if (response.status < OK || response.status >= MULTIPLE_CHOICES) {
						const error = new Error(response.statusText);
						error.status = response.status;
						throw error;
					}

					return response;
				}
			).then(
				(response) => response.json()
			).then((json) => {
				return fromJS(json);
			}),
		});
	};
}

export const SET_CURRENT_USER = "APP/SET_CURRENT_USER";

export function setCurrentUser({ user }) {
	return {
		type: SET_CURRENT_USER,
		payload: { user },
	};
}
