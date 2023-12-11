import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";

export const reateCategoryAction = createAsyncThunk(
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
