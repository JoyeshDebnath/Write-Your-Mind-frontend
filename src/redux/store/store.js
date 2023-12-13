import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import categoryReducer from "../slices/category/categorySlice";
import postsSlices from "../slices/posts/postsSlices";
const store = configureStore({
	reducer: {
		users: userReducer,
		category: categoryReducer,
		posts: postsSlices,
	},
});

export default store;
