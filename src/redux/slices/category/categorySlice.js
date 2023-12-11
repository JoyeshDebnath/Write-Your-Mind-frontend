import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

export const createCategoryAction = createAsyncThunk(
	"category/create-category",
	async (category, { rejectWithValue, getState, dispatch }) => {
		// console.log("Inside the create category action ..", getState());
		//get the token from users state ...
		const user = getState()?.users;
		const { userAuth } = user;
		//get the auser auth token from the  users state .in store ...
		//config for headers ...
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.post(
				`${baseUrl}/api/category`,
				{
					title: category?.title,
				},
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

//fetch category action
export const fetchAllCategoriesAction = createAsyncThunk(
	"category/fetch-all-categories",
	async (payload, { rejectWithValue, getState, dispatch }) => {
		//get the token from users state ...
		const user = getState()?.users;
		const { userAuth } = user;
		//get the auser auth token from the  users state .in store ...
		//config for headers ...
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.get(`${baseUrl}/api/category`, config);
			return data;
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

		//-----------------------------------------------------------------
		//fetch Category Reducers
		//---------------------------------------------------------------
		builder.addCase(fetchAllCategoriesAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchAllCategoriesAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.categoryList = action?.payload;
		});

		builder.addCase(fetchAllCategoriesAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default categorySlices.reducer;
