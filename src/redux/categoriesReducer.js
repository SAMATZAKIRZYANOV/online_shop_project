import { categoriesAPI } from "../api/api";

const initialState = {
    categories: [],
    isLoading: false,
    error: null
}

const SET_CATEGORIES = 'categories/SET_CATEGORIES';
const SET_LOADING = 'categories/SET_LOADING';
const SET_ERROR = 'categories/SET_ERROR';

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return {...state, categories: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
}

export const setCategories = (categories) => ({type: SET_CATEGORIES, payload: categories});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});
export const setError = (error) => ({type: SET_ERROR, payload: error});

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const categories = await categoriesAPI.getCategories();
        dispatch(setCategories(categories));
        dispatch(setError(null));
    }catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addCategory = (categoryId, categoryName, categorySlug, categoryParentId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await categoriesAPI.addCategory(categoryId, categoryName, categorySlug, categoryParentId);
        await dispatch(fetchCategories());
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteCategory = (item) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await categoriesAPI.deleteCategory(item);
        await dispatch(fetchCategories());
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};