import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../css/FavoursPage.css";

export const FavoursPage = () => {
    const favours = useSelector(state => state.favours.items);
    const isAuth = useSelector(state => state.auth.isAuth);

    if (!isAuth) {
        return (
            <div className="auth-warning">
                <h1>Вам сначала необходимо авторизоваться!</h1>
                <Link to="/profile/login">
                    Перейти на страницу авторизации
                </Link>
            </div>
        );
    }

    return (
        <div className="favours-container">
            <h1 className="favours-title">Понравившиеся вам товары</h1>
            
            {favours.length === 0 ? (
                <div className="empty-favours-container">
                    <div className="empty-favours-message">
                        <div className="empty-favours-text">Ваш список избранного пуст</div>
                        <Link to="/" className="route-to-home">Перейти на домашнюю страницу</Link>
                    </div>
                </div>
            ) : (
                <div className="favours-list">
                    {favours.map(item => (
                        <Link to={`/product/${item.product.id}`} key={item.product.id}>
                            <div className="favour-item">
                                <img className="favour-image" src={item.product.src} alt={item.product.name} />
                                <div className="favour-name">{item.product.name}</div>
                                <div className="favour-price">{item.product.basePrice} ₽</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
