import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './rootReducer';

const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) return { items: [] };
    const parsed = JSON.parse(serializedCart);

    if (!parsed || !Array.isArray(parsed.items)) return { items: [] };

    // Проверка каждого элемента
    const validItems = parsed.items.filter(item => item.product && item.product.id);

    return { items: validItems };
  } catch (e) {
    return { items: [] };
  }
};


const preloadedState = {
  cart: loadCart()
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // redux-thunk уже включен по умолчанию
});

store.subscribe(() => {
  const { cart } = store.getState();
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (e) {}
});

export default store;
