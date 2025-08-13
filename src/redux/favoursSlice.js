import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUserFavours = createAsyncThunk(
    'favours/loadUserFavours',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3001/users/${userId}`);
            return response.data.favours || [];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const syncWithServerFavours = createAsyncThunk(
    'favours/syncWithServerFavours',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth, favours } = getState();
            if (!auth.user) return;
            await axios.patch(`http://localhost:3001/users/${auth.user.id}`, {
                favours: favours.items
            });
            return favours.items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const favoursSlice = createSlice({
    name: "favours",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        addToFavours: (state, action) => {
            const prod = action.payload;
            const found = state.items.find(item => item.product.id === prod.id);
            if (!found) {
                state.items.push({ product: prod });
            }
        },
        removeFromFavours: (state, action) => {
            state.items = state.items.filter(item => item.product.id !== action.payload);
        },
        clearFavours: (state) => {
            state.items = [];
        },
        setFavours: (state, action) => {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFavours.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUserFavours.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(loadUserFavours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(syncWithServerFavours.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(syncWithServerFavours.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(syncWithServerFavours.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { addToFavours, removeFromFavours, clearFavours, setFavours } = favoursSlice.actions;
export default favoursSlice.reducer;
