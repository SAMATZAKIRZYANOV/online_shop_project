import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = ({ form, onChange, onSubmit, loading, error }) => {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #333;
        }
        .container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .register-box {
          background: #fff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 450px;
          text-align: center;
        }
        .register-box h2 {
          margin-bottom: 30px;
          color: #4a4a4a;
          font-weight: 700;
        }
        .register-box form {
          display: flex;
          flex-direction: column;
        }
        .register-box input {
          padding: 12px 15px;
          margin-bottom: 20px;
          border: 1.8px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        .register-box input:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
        }
        .register-box button {
          padding: 14px;
          background-color: #667eea;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-weight: 600;
        }
        .register-box button:disabled {
          background-color: #a3a9f7;
          cursor: not-allowed;
        }
        .register-box button:hover:not(:disabled) {
          background-color: #5a6dd8;
        }
        .login-link {
          margin-bottom: 25px;
        }
        .login-link h2 {
          font-weight: 600;
          color: blue;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .login-link h2:hover {
          color: #c1b3f7;
          text-decoration: underline;
        }
        .error-message {
          color: #e74c3c;
          margin-bottom: 20px;
          font-weight: 600;
        }
      `}</style>

      <div className="container">
        <div className="register-box">
          <div className="login-link">
            <Link to="/profile/login">
              <h2>Вход</h2>
            </Link>
          </div>

          <form onSubmit={onSubmit}>
            <h2>Регистрация</h2>
            {error && <div className="error-message">{error}</div>}

            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Номер телефона"
              required
            />
            <input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="Имя пользователя"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Фамилия пользователя"
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="Пароль"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
