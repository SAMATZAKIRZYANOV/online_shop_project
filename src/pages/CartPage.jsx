import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/CartPage.css";
import { addToCart, removeFromCart } from "../redux/cartSlice";

export const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const products = useSelector((state) => state.products.products);
  
  const cartProductsId = cartItems.map(item => item.id)
  const filteredProducts = products.filter(item => cartProductsId.includes(item.id));

  let total = 0;

  const goPayment = () => {
    navigate("/pay");
  }

  const handleMinusCount = (productId, selectedColor, selectedSize) => {
    dispatch(removeFromCart({ productId, selectedColor, selectedSize }));
  };

  const handlePlusCount = (product, selectedColor, selectedSize) => {
    dispatch(addToCart({ product, selectedColor, selectedSize }));
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">КОРЗИНА</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Корзина пуста</p>
          <Link to="/" className="btn-home">
            Перейти на главную страницу
          </Link>
        </div>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map((item) => {
              const { id, selectedColor, selectedSize, count } = item || {};
              const product = filteredProducts.find(item => item.id === id);
              const info_about_color = product.colors.filter(item => item.color === selectedColor);
              const info_about_size = info_about_color.length > 0 ? info_about_color[0].sizes.filter(item => item.size === selectedSize) : [];
              const stock = info_about_size.length > 0 ? Number(info_about_size[0].stock) : 0;
              total = total + (product.basePrice * count);
              if (!id) return null;

              return (
                <li
                  key={`${id}-${selectedColor}-${selectedSize}`}
                  className="cart-item"
                >
                  <div className="product-info">
                    <Link to={`/product/${product.id}`} className="product-name-link">
                      <div>{product.name}</div>
                    </Link>
                    <div>
                      Цвет: <strong>{selectedColor}</strong>
                    </div>
                    <div>
                      Размер: <strong>{selectedSize}</strong>
                    </div>
                    <div>Цена: {product.basePrice * count} ₽</div>
                  </div>
                  <div className="product-stock">
                    <div className="product-counter">
                      <button onClick={() => handleMinusCount(product.id, selectedColor, selectedSize)} className="in-stock">
                        -
                      </button>
                      <div>{count}</div>
                      <button onClick={() => handlePlusCount(product, selectedColor, selectedSize)} className={count >= stock ? "out-of-stock" : "in-stock"} disabled={count >= stock}>
                        +
                      </button>
                    </div>
                    <div className="product-in-or-out-stock">
                      {count >= stock ? "Это все что есть в наличии" : ""}
                    </div>
                  </div>
                  <div>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.src} alt={product.name} className="product-img" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="pay-place">
            <div className="total-price">
              <strong>Итого: {total} ₽</strong>
            </div>

            {isAuth ? 
              (<button onClick={goPayment} className="pay-btn">Оформить заказ</button>) :
              (
                <div>
                  <div>Необходима авторизация для оплаты товаров</div>
                  <Link to="/profile/login">
                    Авторизация
                  </Link>
                </div>
              )
            }  
          </div>
        </div>
      )}
    </div>
  );
};
