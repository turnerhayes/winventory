import { Map } from "immutable";
import { SET_CURRENT_USER } from "../actions";

export default function usersReducer(state = Map(), action) {
	switch(action.type) {
		case SET_CURRENT_USER: {
			return state.set("current", action.payload.user);
		}

		default: return state;
	}
}
