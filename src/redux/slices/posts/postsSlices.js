import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

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

		builder.addCase(createPostAction.fulfilled, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.postCreated = action?.payload;
		});

		builder.addCase(createPostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default postSlices.reducer;
