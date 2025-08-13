import { brandsAPI } from "../api/api";

const initialState = {
    brands: [],
    isLoading: false,
    error: null
};

const SET_BRANDS = 'header/SET_BRANDS';
const SET_LOADING = 'header/SET_LOADING';
const SET_ERROR = 'header/SET_ERROR';

export const brandsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BRANDS:
            return {...state, brands: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    };
};

export const setBrands = (brands) => ({type: SET_BRANDS, payload: brands});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});
export const setError = (error) => ({type: SET_ERROR, payload: error});

export const fetchBrands = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const brands = await brandsAPI.getBrands();
        dispatch(setBrands(brands));
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addBrand = (brandId, brandName, brandSlug) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await brandsAPI.addBrand(brandId, brandName, brandSlug);
        await dispatch(fetchBrands());
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteBrand = (item) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await brandsAPI.deleteBrand(item);
        await dispatch(fetchBrands());
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};



