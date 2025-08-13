import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import "../css/App.css";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "../redux/headerReducer";

export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuHovered, setMenuHovered] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const { menuItems, isLoading, error } = useSelector((state) => state.header);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  useEffect(() => {
    setActiveMenu(null);
  }, [location]);

  // Функция для форматирования URL
  const toUrlFormat = (str) => str.toLowerCase().replace(/\s+/g, "-");

  // Логика для закрытия меню только если курсор не над меню и не над overlay
  useEffect(() => {
    if (!menuHovered) {
      const timeout = setTimeout(() => setActiveMenu(null), 120); // небольшая задержка для UX
      return () => clearTimeout(timeout);
    }
  }, [menuHovered]);

  if (isLoading) {
    return <header className="header">Loading menu...</header>;
  }

  if (error) {
    return <header className="header">Error loading menu: {error}</header>;
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-container" aria-label="Home">
          <img src={logo} className="logo" alt="TEGRA" />
        </Link>
      </div>

      <nav className="nav-container" aria-label="Main navigation">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="nav-item-wrapper"
              onMouseEnter={() => {
                setActiveMenu(item.name);
                setMenuHovered(true);
              }}
              onMouseLeave={() => setMenuHovered(false)}
            >
              <Link
                to={`/${toUrlFormat(item.name)}`}
                className={`nav-item ${activeMenu === item.name ? "active" : ""}`}
                tabIndex={0}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {activeMenu && (
          <div
            className="nav-overlay"
            role="region"
            aria-label={`${activeMenu} submenu`}
            onMouseEnter={() => setMenuHovered(true)}
            onMouseLeave={() => setMenuHovered(false)}
          >
            <div className="overlay-content">
              {menuItems
                .find((i) => i.name === activeMenu)
                ?.sub?.map((category) => (
                  <div key={category.category} className="category-section">
                    <h4>
                      <Link
                        to={`/${toUrlFormat(activeMenu)}/${toUrlFormat(category.category)}`}
                        className="subcategory-name"
                      >
                        {category.category}
                      </Link>
                    </h4>
                    <ul>
                      {category.subcategories.map((subItem) => (
                        <li key={subItem} className="li-items">
                          <Link
                            to={`/${toUrlFormat(activeMenu)}/${toUrlFormat(category.category)}/${toUrlFormat(subItem)}`}
                            className="submenu-link"
                          >
                            {subItem}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        )}
      </nav>

      <div className="header-right">
        <Link to="/cart" aria-label="Корзина">
          <FiShoppingCart className="icon" />
        </Link>
        <Link to="/favours" aria-label="Избранное">
          <FiHeart className="icon" />
        </Link>
        <Link to="/profile" aria-label="Профиль">
          <CgProfile className="icon" />
        </Link>
      </div>
    </header>
  );
};

