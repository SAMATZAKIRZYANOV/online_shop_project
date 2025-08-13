import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";

// Примерные данные для демонстрации
const MOCK_USER_STATS = {
  orders: 12,
  favorites: 5,
  bonuses: 350,
};

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user) || {};
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  console.log(user.id);
  const firstName = user.firstName || "User";
  const email = user.email || "your@email.com";

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/profile/login");
  };

  const handleSettings = () => {
    navigate("/profile/settings");
  };

  const handleOrders = () => {
    navigate("/profile/orders");
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img
          src={`https://ui-avatars.com/api/?name=${firstName}&background=random`}
          alt="Avatar"
          style={styles.avatar}
        />
        <h1 style={styles.greeting}>Привет, {firstName}!</h1>
        <p style={styles.email}>{email}</p>
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{MOCK_USER_STATS.orders}</span>
            <span style={styles.statLabel}>Заказов</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{MOCK_USER_STATS.favorites}</span>
            <span style={styles.statLabel}>Избранное</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{MOCK_USER_STATS.bonuses}</span>
            <span style={styles.statLabel}>Бонусы</span>
          </div>
        </div>
        <div style={styles.buttonGroup}>
          { (user.id === "0") ? 
            (<Link to="/admin/CMS" style={styles.admin}>CMS</Link>) : ""
          }
          <button style={styles.button} onClick={handleOrders}>
            История заказов
          </button>
          <button style={styles.button} onClick={handleSettings}>
            Настройки профиля
          </button>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 6px 24px rgba(60,60,60,0.08)",
    padding: "40px 32px",
    maxWidth: "380px",
    width: "100%",
    textAlign: "center",
  },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    marginBottom: "16px",
    border: "3px solid #e3e9f1",
  },
  greeting: {
    margin: "0 0 8px 0",
    fontWeight: 700,
    fontSize: "2rem",
    color: "#222",
  },
  email: {
    color: "#888",
    fontSize: "1rem",
    marginBottom: "22px",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "28px",
  },
  statItem: {
    flex: 1,
    padding: "8px 0",
  },
  statNumber: {
    display: "block",
    fontWeight: 600,
    fontSize: "1.3rem",
    color: "#3a7bd5",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#888",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  button: {
    padding: "10px 0",
    borderRadius: "8px",
    border: "none",
    background: "#3a7bd5",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.2s",
  },
  admin: {
    padding: "10px 0",
    borderRadius: "8px",
    border: "none",
    background: "#3a7bd5",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.2s",
  },
  logoutButton: {
    padding: "10px 0",
    borderRadius: "8px",
    border: "none",
    background: "#f44336",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "8px",
    transition: "background 0.2s",
  },
};
