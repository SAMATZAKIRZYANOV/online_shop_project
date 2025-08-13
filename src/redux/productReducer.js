import { productsAPI } from "../api/api";

const initialState = {
    products: [],
    isLoading: false,
    error: null
};

const SET_PRODUCTS = "/products/SET_PRODUCTS";
const SET_LOADING = "/products/SET_LOADING";
const SET_ERROR = "products/SET_ERROR";

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    };
};

export const setProducts = (prods) => ({type: SET_PRODUCTS, payload: prods});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});
export const setError = (error) => ({type: SET_ERROR, payload: error});

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const products = await productsAPI.getProducts();
        dispatch(setProducts(products));
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addReview = (productId, review) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await productsAPI.addReview(productId, review);
    // После успешной отправки — обновляем список товаров
    await dispatch(fetchProducts());
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await productsAPI.deleteProduct(id);
        await dispatch(fetchProducts());
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addProduct = (newProduct) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await productsAPI.addProduct(newProduct);
        await dispatch(fetchProducts());
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
}