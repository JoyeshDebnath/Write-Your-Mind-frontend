import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

export const createCategoryAction = createAsyncThunk(
	"category/create-category",
	async (category, { rejectWithValue, getState, dispatch }) => {
		try {
			//http call for category
			// console.log(getState)
			const { data } = await axios.post(`${baseUrl}/api/category`, {
				title: category?.title,
			});
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//category slices

const categorySlices = createSlice({
	name: "categories",
	initialState: { category: "all" },
	extraReducers: (builder) => {
		builder.addCase(createCategoryAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(createCategoryAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.category = action?.payload;
		});

		builder.addCase(createCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default categorySlices.reducers;
