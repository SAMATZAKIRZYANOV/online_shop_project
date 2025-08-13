import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, syncCartWithServer } from "../redux/cartSlice";
import { addToFavours, syncWithServerFavours } from "../redux/favoursSlice";
import { addReview } from "../redux/productReducer";


export const ProductPage = ({ product }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const reviews_author_indexes = product.reviews.map(item => item.author_id);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [forSizeShowing, setForSizeShowing] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleColorSelect = (item, color) => {
    setSelectedColor(color);
    setForSizeShowing(item);
  }

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddNewReview = () => {
    if (!isAuth) {
      setShowAuthModal(true);
    } else {
      if (reviews_author_indexes.includes(user.id)) {
        alert('Вы уже писали отзыв!');
      } else {
        setShowReviewForm(true);
      }
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const review = {
      rating,
      comment,
      author_id: user.id,
      author: `${user.firstName} ${user.lastName[0]}.`,
      date: new Date().toLocaleDateString(),
    };

    try {
      await dispatch(addReview(product.id, review));
      alert("Спасибо за ваш отзыв!");
      closeReviewForm();
    } catch (e) {
      alert("Ошибка при отправке отзыва. Попробуйте позже.");
    }
  };


  const closeModal = () => {
    setShowAuthModal(false);
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setRating(5);
    setComment("");
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
        alert("Пожалуйста, выберите цвет и размер!");
        return;
    }
    dispatch(addToCart({ product, selectedColor, selectedSize }));
    if (isAuth) {
        setTimeout(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
        dispatch(syncCartWithServer(cart));
        }, 0);
    }
    alert("Товар в корзине!");
  };

  const handleAddToFavours = () => {
    dispatch(addToFavours(product));
    if (isAuth) {
      dispatch(syncWithServerFavours());
    }
    alert("Товар добавлен в понравившиеся");
  };

  const averageRating = () => {
    if (product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / product.reviews.length).toFixed(1);
  };

  return (
    <div className="product-page">
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={closeModal}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <h3>Требуется авторизация</h3>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>
            <div className="auth-modal-body">
              <p>Чтобы оставить отзыв, необходимо авторизоваться</p>
              <div className="auth-modal-buttons">
                <Link to="/profile/register" className="auth-btn" onClick={closeModal}>
                  Зарегистрироваться
                </Link>
                <Link to="/profile/login" className="auth-btn" onClick={closeModal}>
                  Войти в аккаунт
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReviewForm && (
        <div className="review-form-overlay" onClick={closeReviewForm}>
          <div className="review-form" onClick={(e) => e.stopPropagation()}>
            <h3>Добавить отзыв</h3>
            <form onSubmit={handleSubmitReview}>
              <label>
                Рейтинг:
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <option key={star} value={star}>
                      {star} ★
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Комментарий:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  required
                />
              </label>
              <div className="review-form-buttons">
                <button type="submit">Отправить</button>
                <button type="button" onClick={closeReviewForm}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="breadcrumbs">
        <Link to={`/${product.line_for_page[0]}`}>{product.line_for_page[0]}</Link>
        <span className="breadcrumbs-sep">→</span>
        <Link to={`/${product.line_for_page[0]}/${product.line_for_page[1]}`}>
          {product.line_for_page[1]}
        </Link>
        <span className="breadcrumbs-sep">→</span>
        <Link
          to={`/${product.line_for_page[0]}/${product.line_for_page[1]}/${product.line_for_page[2]}`}
        >
          {product.line_for_page[2]}
        </Link>
      </nav>

      <div className="product-card">
        <div className="product-left">
          <div className="product-image">
            <img src={product.src} alt={product.name} />
          </div>
          <div className="product-info">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">{product.basePrice} ₽</p>
          </div>
        </div>

        <div className="product-right">
          <div className="color-selector">
            <p className="product-colors-title">Выберите цвет:</p>
            <div className="product-color">
                {product.colors.map((item) => (
                    <button
                        className={`color-btn ${selectedColor === item.color ? "selected" : ""}`}
                        style={{color: (item.sizes.filter(m => m.stock !== 0).length === 0) ? "red" : "black"}}
                        disabled={(item.sizes.filter(m => m.stock !== 0).length === 0)}
                        onClick={() => handleColorSelect(item, item.color)}
                    >
                        {item.color}
                    </button>
                ))}
            </div>
          </div>

          <div className="size-selector">
            <p className="product-sizes-title">Выберите размер:</p>
            <div className="product-size">
              {selectedColor === null ? 
                (<div>выберите цвет сначала</div>) 
                : 
                (forSizeShowing.sizes.map((item) => (
                  <button
                    key={item.size}
                    className={`size-btn ${
                      selectedSize === item.size ? "selected" : ""
                    }`}
                    style={{ color: item.stock === 0 ? "red" : "black" }}
                    disabled={item.stock === 0}
                    onClick={() => handleSizeSelect(item.size)}
                  >
                    {item.size}
                  </button>
                )))
              }
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart}>ДОБАВИТЬ В КОРЗИНУ</button>
            <button onClick={handleAddToFavours}>ДОБАВИТЬ В ПОНРАВИВШИЕСЯ</button>
          </div>

        </div>
      </div>

      <div className="reviews">
        <div className="reviews-header">
          <h3>Отзывы</h3>
          <button onClick={handleAddNewReview}>Добавить отзыв</button>
        </div>
        {product.reviews.length > 0 && (
            <div className="average-rating">
            <span className="average-rating-value">★ {averageRating()}</span>
            <span className="average-rating-count">({product.reviews.length} отзыв{product.reviews.length > 1 ? "ов" : ""})</span>
            </div>
        )}
        {product.reviews.length === 0 && <div className="no-reviews">Пока нет отзывов</div>}
        {product.reviews.map((review, id) => (
          <div className="review" key={id}>
            <div className="review-header">
              <span className="review-author">{review.author}</span>
              <span className="review-date">{review.date}</span>
              <span className="review-rating">★ {review.rating}</span>
            </div>
            <div className="review-comment">{review.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
