import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

//custom action .to redirect
const resetUpdateAction = createAction("category/edit-reset");
const resetDeleteAction = createAction("category/delete-reset");
const resetCreateAction = createAction("category/create-reset");

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
			//dispatch custom action to reset or redirect after category creation
			dispatch(resetCreateAction());
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

//Update a category Action
export const updateCategoryAction = createAsyncThunk(
	"category/update-category",
	async ({ categoryId, title }, { rejectWithValue, getState, dispatch }) => {
		const user = getState().users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};

		try {
			const { data } = await axios.put(
				`${baseUrl}/api/category/${categoryId}`,
				{ title: title },
				config
			);
			//dispatch an action to reset the updated data ..
			dispatch(resetUpdateAction());

			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);
//Delete a category action .
export const deleteCategoryAction = createAsyncThunk(
	"category/delete-category",
	async (categoryId, { rejectWithValue, getState, dispatch }) => {
		const user = getState().users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};

		try {
			const { data } = await axios.delete(
				`${baseUrl}/api/category/${categoryId}`,
				config
			);
			//dispatch  action to reset delete
			dispatch(resetDeleteAction());

			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//Fetch a  Single category action .
export const fetchSingleCategoryAction = createAsyncThunk(
	"category/fetch-single-category",
	async (categoryId, { rejectWithValue, getState, dispatch }) => {
		const user = getState().users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};

		try {
			const { data } = await axios.get(
				`${baseUrl}/api/category/${categoryId}`,
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

//category slices

const categorySlices = createSlice({
	name: "categories",
	initialState: { category: "all" },
	extraReducers: (builder) => {
		//-------------------------------------------------------------------------
		//Create a Category
		//------------------------------------------------------------------------
		builder.addCase(createCategoryAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(resetCreateAction, (state, action) => {
			state.isCreated = true;
		});
		builder.addCase(createCategoryAction.fulfilled, (state, action) => {
			state.loading = false;
			state.isCreated = false;
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

		//-----------------------------------------------------------------
		//Update Category Reducers
		//---------------------------------------------------------------
		builder.addCase(updateCategoryAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		//dispatch action
		builder.addCase(resetUpdateAction, (state, action) => {
			state.isEdited = true;
		});

		builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
			state.loading = false;
			state.isEdited = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.updatedCategory = action?.payload;
		});

		builder.addCase(updateCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//-----------------------------------------------------------------
		//Delete Category Reducers
		//---------------------------------------------------------------
		builder.addCase(deleteCategoryAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		//dispatch for redirect after deleteing
		builder.addCase(resetDeleteAction, (state, action) => {
			state.isDeleted = true;
		});

		builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.isDeleted = false;
			state.deletedCategory = action?.payload;
		});

		builder.addCase(deleteCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//-----------------------------------------------------------------
		//Fetch a Single  Category Reducers
		//---------------------------------------------------------------
		builder.addCase(fetchSingleCategoryAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchSingleCategoryAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.category = action?.payload;
		});

		builder.addCase(fetchSingleCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default categorySlices.reducer;
