import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseURL";
import { act } from "react-dom/test-utils";
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
				`${baseUrl}/api/users/register`,
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

//2> Login Action..
export const loginUserAction = createAsyncThunk(
	"users/login",
	async (userData, { rejectWithValue, getState, dispatch }) => {
		try {
			//http call
			const config = {
				headers: {
					"content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				`${baseUrl}/api/users/login`,
				userData,
				config
			);
			//save user data of logged in user to local strorage
			localStorage.setItem("userInfo", JSON.stringify(data));

			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//---------------------------------------------------------
//Logout Action
//-------------------------------------------------------
export const logoutUserAction = createAsyncThunk(
	"users/logout",
	async (payload, { rejectWithValue, getState, dispatch }) => {
		try {
			//remove the logged in user from local storage
			localStorage.removeItem("userInfo");
		} catch (error) {
			if (!error?.response) throw error;

			return rejectWithValue(error?.response?.data);
		}
	}
);

//get the user from the local storage .. and put into store
const userLoginFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

// Slices
const userSlices = createSlice({
	name: "users",
	initialState: {
		userAuth: userLoginFromStorage,
	},
	extraReducers: (builder) => {
		//REGISTER
		//when request pending :  handle pending state
		builder.addCase(registerUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		//when request returnns data : handle fulfilled
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.registered = action.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		//something goes wrong : handle rejected
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.loading = false;
			// state.registered = undefined;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//------------------------------------------------------------------------------
		//Login
		//------------------------------------------------------------------------------
		//login request pending
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		//login request fulfilled
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.userAuth = action?.payload;
		});
		//lofin failed request
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//----------------------------------------------------------------------------------
		//Logout User reducer
		//----------------------------------------------------------------------------------

		builder.addCase(logoutUserAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(logoutUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.userAuth = undefined;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		builder.addCase(logoutUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default userSlices.reducer;
