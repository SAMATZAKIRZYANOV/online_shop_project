import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from '../redux/authSlice';
import {useNavigate} from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';


const RegisterPageContainer = () => {
    const [form, setForm] = useState({email: "", password: "", firstName: "", lastName: "", phone: ""});
    const dispatch = useDispatch();
    const {isAuth, loading, error} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(registerUser({...form, createdAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), isActive: true, cart: [], favours: []}));
        if (registerUser.fulfilled.match(resultAction)) {
            alert('Регистрация прошла успешно!');
            navigate('/profile');
        }
    };
    
    useEffect(() => {
        if (isAuth) navigate('/profile');
    }, [isAuth, navigate]);
    
    return (
        <RegisterPage form={form} onChange={handleChange} onSubmit={handleSubmit} loading={loading} error={error}/>
    );
};

export default RegisterPageContainer;