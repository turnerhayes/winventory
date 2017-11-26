import { combineReducers } from "redux-immutable";
import routerReducer from "./router";
import usersReducer from "./users";
import inventoryReducer from "./inventory";

export default combineReducers({
	routing: routerReducer,
	inventory: inventoryReducer,
	users: usersReducer,
});
