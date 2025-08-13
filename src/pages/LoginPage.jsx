import React from "react";
import { Link } from "react-router-dom";

const LoginPage = ({ form, onChange, onSubmit }) => {
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
        .login-box {
          background: #fff;
          padding: 40px 30px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .login-box h2 {
          margin-bottom: 30px;
          color: #4a4a4a;
          font-weight: 700;
        }
        .login-box form {
          display: flex;
          flex-direction: column;
        }
        .login-box input {
          padding: 12px 15px;
          margin-bottom: 20px;
          border: 1.8px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }
        .login-box input:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
        }
        .login-box button {
          padding: 12px;
          background-color: #667eea;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-weight: 600;
        }
        .login-box button:hover {
          background-color: #5a6dd8;
        }
        .register-link {
          margin-bottom: 25px;
        }
        .register-link h2 {
          font-weight: 600;
          color: blue;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .register-link h2:hover {
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
        <div className="login-box">
          <div className="register-link">
            <Link to="/profile/register">
              <h2>Регистрация</h2>
            </Link>
          </div>

          <form onSubmit={onSubmit}>
            <h2>Вход</h2>
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
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
