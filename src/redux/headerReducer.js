import { headersAPI } from "../api/api";

const initialState = {
    menuItems: [],
    isLoading: false,
    error: null,
};

const SET_MENU_ITEMS = 'header/SET_MENU_ITEMS';
const SET_LOADING = 'header/SET_LOADING';
const SET_ERROR = 'header/SET_ERROR';

export const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MENU_ITEMS:
            return {...state, menuItems: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_ERROR:
            return {...state,  error: action.payload};
        default:
            return state;
    }
};

export const setMenuItems = (items) => ({type: SET_MENU_ITEMS, payload: items});
export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});
export const setError = (error) => ({type: SET_ERROR, payload: error});

export const fetchMenuItems= () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const menuItems = await headersAPI.getHeaderMenuElems();
        dispatch(setMenuItems(menuItems));
        dispatch(setError(null));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};