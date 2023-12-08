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

// Slices
const userSlices = createSlice({
	name: "users",
	initialState: {
		userAuth: "login",
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
	},
});

export default userSlices.reducer;
