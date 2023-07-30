import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

//1.create initial state
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
}

//4.create asyncThunk - a function that allows us to use asyncronous data, for register and login
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			console.log(user)
			return authService.register(user)
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString()

			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		console.log(user)
		return authService.login(user)
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString()

		return thunkAPI.rejectWithValue(message)
	}
})

export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		await authService.logout()
	} catch (error) {
		console.log(error)
	}
})

//2.create slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ''
		},
	},
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
				state.isError = true
				state.message = action.payload
			})
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.user = action.payload
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
				state.isError = true
				state.message = action.payload
			})
			.addCase(logout.fulfilled, state => {
				state.user = null
			})
	},
})

export default authSlice.reducer

//3.import authReducer in store.js and add it in reducer object

//5.in Register.jsx import useSelector, useDispatch from redux and register from authSlice - use useSelector to get access to data from state, use useDispatch to be able to dispatch an action and register is the action we dispatch ----> dispatch(register(userData))
