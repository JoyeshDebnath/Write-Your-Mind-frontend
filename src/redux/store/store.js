import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import categoryReducer from "../slices/category/categorySlice";
const store = configureStore({
	reducer: {
		users: userReducer,
		category: categoryReducer,
	},
});

export default store;
