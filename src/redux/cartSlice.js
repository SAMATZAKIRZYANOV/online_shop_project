import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadUserCart = createAsyncThunk(
  'cart/loadUserCart',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      return response.data.cart || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const syncCartWithServer = createAsyncThunk(
  'cart/syncCartWithServer',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth, cart } = getState();
      if (!auth.user) return;
      await axios.patch(`http://localhost:3001/users/${auth.user.id}`, {
        cart: cart.items
      });
      return cart.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedColor, selectedSize } = action.payload;
      // Поиск товара с таким же id и размером
      const found = state.items.find(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      const m1 = product.colors.filter(item => item.color === selectedColor);
      const m2 = m1[0].sizes.filter(item => item.size === selectedSize);
      const stock = m2[0].stock;


      if (found) {
        if (found.count + 1 <= stock) {
          found.count += 1;
        }
      } else {
        state.items.push({ id: product.id, selectedColor, selectedSize, count: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { productId, selectedColor, selectedSize } = action.payload;

      const found = state.items.find(
        item => item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (found) {
        if (found.count > 1) {
          found.count -= 1;
        } else {
          state.items = state.items.filter(
            item => !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
          );
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCart: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncCartWithServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.items = action.payload;
        }
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;