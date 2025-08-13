import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductPage } from "../pages/ProductPage";

export const ProductPageContainer = () => {
    const { id } = useParams();
    const { products } = useSelector(state => state.products);

    const product = products.find(p => String(p.id) === String(id));

    if (!product) {
        return <div>Товар не найден!</div>;
    }

    return (
        <ProductPage product={product} />
    );
}