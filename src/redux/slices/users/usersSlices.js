import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//create Actions ..
//1> register Action
export const registerUserAction = createAsyncThunk(
	"users/register",
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			//http calls
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			}; //configuration for headers
			const { data } = await axios.post(
				`http://localhost:5000/api/users/register`,
				user,
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
