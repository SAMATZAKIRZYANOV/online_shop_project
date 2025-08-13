import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { loadUserCart } from "../redux/cartSlice";
import { loadUserFavours } from "../redux/favoursSlice";

const LoginPageContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, loading, error, user } = useSelector(state => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isAuth) {
            navigate('/profile');
            if (user && user.id) {
                dispatch(loadUserCart(user.id));
                dispatch(loadUserFavours(user.id));
            }
        }
    }, [isAuth, navigate, dispatch, user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <LoginPage form={form} onChange={handleChange} onSubmit={handleSubmit} />
        </>
    );
};

export default LoginPageContainer;
