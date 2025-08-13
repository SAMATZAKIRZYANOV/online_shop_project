import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Регистрация пользователя
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const existsResp = await axios.get(`http://localhost:3001/users?email=${newUser.email}`);
      if (existsResp.data.length > 0) {
        return rejectWithValue('Пользователь с таким email уже существует');
      }
      const createResp = await axios.post('http://localhost:3001/users', newUser);
      return { token: createResp.data.id, user: createResp.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Логин пользователя
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users?email=${credentials.email}&password=${credentials.password}`
      );
      if (response.data.length === 0) {
        throw new Error('Пользователь не найден или неверный пароль');
      }
      const user = response.data[0];
      return { token: user.id, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuth: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
