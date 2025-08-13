import { combineReducers } from "@reduxjs/toolkit";
import { headerReducer } from "./headerReducer";
import authReducer from "./authSlice";
import { productReducer } from "./productReducer";
import cartReducer from "./cartSlice";
import favoursReducer from "./favoursSlice";
import { brandsReducer } from "./brandsReducer";
import { categoriesReducer } from "./categoriesReducer";

const rootReducer = combineReducers({
    header: headerReducer,
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    favours: favoursReducer,
    brands: brandsReducer,
    categories: categoriesReducer
});

export default rootReducer;