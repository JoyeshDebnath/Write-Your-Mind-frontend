import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
const store = configureStore({
	reducer: {
		users: userReducer,
	},
});

export default store;
