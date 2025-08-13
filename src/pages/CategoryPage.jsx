import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../redux/productReducer";
import '../css/CategoryPage.css'
import { Link } from "react-router-dom";

export const CategoryPage = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(state => state.products);
    const { level1, level2, level3 } = useParams();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading) return <div className="header">Loading...</div>;
    if (error) return <div className="header">Error: {error}</div>;

    const normalizeString = (str) => str?.toLowerCase().trim().replace(/-/g, ' ');

    const getFilteredProducts = () => {
        const normalizedLevel1 = normalizeString(level1);
        const normalizedLevel2 = normalizeString(level2);
        const normalizedLevel3 = normalizeString(level3);
        
        console.log(normalizedLevel1);
        console.log(normalizedLevel2);
        console.log(normalizedLevel3);

        if (normalizedLevel1 === "new arrivals") {
            return products.filter(p => p.categories.includes("new"));
        }
        if (normalizedLevel1 === "sale") {
            return products.filter(p => p.categories.includes("sale"));
        }

        let filtered = products;
        
        if (normalizedLevel1) {
            filtered = filtered.filter(p => p.sex === normalizedLevel1);
        }

        if (normalizedLevel3) {
            filtered = filtered.filter(p => 
                p.categories.some(cat => normalizeString(cat) === normalizedLevel3)
            );
        } else if (normalizedLevel2) {
            filtered = filtered.filter(p => 
                p.categories.some(cat => normalizeString(cat) === normalizedLevel2)
            );
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();

    const getPageTitle = () => {
        const titles = [];
        if (level1) titles.push(level1.replace(/-/g, ' '));
        if (level2) titles.push(level2.replace(/-/g, ' '));
        if (level3) titles.push(level3.replace(/-/g, ' '));
        
        return titles.join(" > ") || "All Products";
    };

    return (
        <div className="category-page">
            <h1>{getPageTitle()}</h1>
            
            {filteredProducts.length === 0 ? (
                <p>No products found in this category</p>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <Link to={`/product/${product.id}`} className="product-link">
                            <div key={product.id} className="product-card">
                                <img src={product.src} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>${(product.basePrice / 100).toFixed(2)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};