import { Map } from "immutable";
import {
	SET_RANK,
	FETCHED_INVENTORY,
} from "../actions";

export default function inventoryReducer(state = Map(), action) {
	switch(action.type) {
		case SET_RANK: {
			return state.setIn(["items", action.payload.itemID, "ranks", action.payload.user], action.payload.rank);
		}

		case FETCHED_INVENTORY: {
			if(action.error) {
				// TODO: handle errors
				console.error(action.error);
				return state;
			}

			return state.mergeDeepIn(["items"], action.payload).set("isFetched", true);
		}

		default: return state;
	}
}
