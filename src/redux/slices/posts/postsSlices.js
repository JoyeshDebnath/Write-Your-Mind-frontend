import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//Reset Post action -- custom
const resetPostAction = createAction("post/post-created-reset");

//-------------------------------------------------------------------
//create Post Action
//------------------------------------------------------------------
export const createPostAction = createAsyncThunk(
	"post/create-post",
	async (post, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: "Bearer " + userAuth?.token,
			},
		};

		try {
			const formData = new FormData();

			formData.append("title", post?.title);
			formData.append("description", post?.description);
			formData.append("category", post?.category);
			formData.append("image", post?.image);

			const { data } = await axios.post(
				`${baseUrl}/api/posts`,
				formData,
				config
			);
			dispatch(resetPostAction()); //custom reset action
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//-------------------------------------------------------------------
//fetch all posts action
//------------------------------------------------------------------
export const fetchAllPostAction = createAsyncThunk(
	"post/fetch-posts",
	async (category, { rejectWithValue, getState, dispatch }) => {
		try {
			const { data } = await axios.get(
				`${baseUrl}/api/posts?category=${category}`
			);
			// console.log("Data", data);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// --------------------------------------------------------------------------------------------------
//Like a post
//--------------------------------------------------------------------------------------------------
export const togglePostLikeAction = createAsyncThunk(
	"post/add-likes",
	async (postId, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: "Bearer " + userAuth?.token,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/posts/likes`,
				{ postId },
				config
			);

			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// --------------------------------------------------------------------------------------------------
//Dislike a post
//--------------------------------------------------------------------------------------------------
export const togglePostDislikeAction = createAsyncThunk(
	"post/add-dislikes",
	async (postId, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: "Bearer " + userAuth?.token,
			},
		};
		try {
			const { data } = await axios.put(
				`${baseUrl}/api/posts/dislikes`,
				{ postId },
				config
			);

			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

const postSlices = createSlice({
	name: "posts",
	initialState: { post: "test" },
	extraReducers: (builder) => {
		//------------------------------------------------------------------------------------
		//create Post Reducer
		//------------------------------------------------------------------------------------
		builder.addCase(createPostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		//custom post reset
		builder.addCase(resetPostAction, (state, action) => {
			state.isPostCreated = true;
		});

		builder.addCase(createPostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.postCreated = action?.payload;
			state.isPostCreated = false;
		});

		builder.addCase(createPostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//------------------------------------------------------------------------------------
		//fetch Post Reducer
		//------------------------------------------------------------------------------------
		builder.addCase(fetchAllPostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchAllPostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.postsList = action?.payload;
		});

		builder.addCase(fetchAllPostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//--------------------------------------------------
		//Like Reducer
		//-------------------------------------------------
		builder.addCase(togglePostLikeAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(togglePostLikeAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.likes = action?.payload;
		});

		builder.addCase(togglePostLikeAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//--------------------------------------------------
		//Dislike Reducer
		//-------------------------------------------------
		builder.addCase(togglePostDislikeAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(togglePostDislikeAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.dislikes = action?.payload;
		});

		builder.addCase(togglePostDislikeAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default postSlices.reducer;
