import React from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";
import { FaVk } from "react-icons/fa";
import { FaOdnoklassniki } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
    const m1 = ["Доставка и оплата", "Возврат и обмен", "Часто задаваемые вопросы (FAQ)", "Размерная сетка"];
    const m2 = ["О нас", "Магазины", "Новости", "Карьера"];
    const m3 = ["Контакты", "Помощь и поддержка", "Гарантии", "Политика конфиденциальности"];
    const m4 = ["Пользовательское соглашение", "Политика обработки персональных данных", "Лицензия"];

    return (
        <div className="footer-container">
            <div className="footer-head">
                <div>
                    <div>
                        <h2>Подпишитесь на рассылку, чтобы первым узнавать о новинках и акциях!</h2>
                        <form className="email-form">
                            <input></input>
                            <button type="submit">Подписаться</button>
                        </form>
                    </div>

                    <div>
                        <h3>Подпишитесь на наши соцсети</h3>
                        <div className="nets">
                            <a href="https://vk.com/" target="_blank" alt="VK" className="social-network"><FaVk/></a>
                            <a href="https://ok.ru/" target="_blank" alt="OK" className="social-network"><FaOdnoklassniki /></a>
                            <a href="https://web.telegram.org/" target="_blank" alt="TG" className="social-network"><FaTelegramPlane /></a>
                            <a href="https://www.youtube.com/" target="_blank" alt="YT" className="social-network"><FaYoutube/></a>
                        </div>
                    </div>

                    <div>
                        <h3>Контакты</h3>
                        <span>+7 (999) 999-99-99</span>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Покупателям</h3>
                        <ul>
                            {m1.map(item => (
                                <Link to="/"><li>{item}</li></Link>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>О компании</h3>
                        <ul>
                            {m2.map(item => (
                                <Link to="/"><li>{item}</li></Link>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Поддержка</h3>
                        <ul>
                            {m3.map(item => (
                                <Link to="/"><li>{item}</li></Link>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Правовая информация</h3>
                        <ul>
                            {m4.map(item => (
                                <Link to="/"><li>{item}</li></Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
