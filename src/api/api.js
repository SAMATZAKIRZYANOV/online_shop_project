import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { deleteCategory } from "../redux/categoriesReducer";
import { deleteBrand } from "../redux/brandsReducer";

const instance = axios.create({
    baseURL: 'http://localhost:3001'
});

export const headersAPI = {
    getHeaderMenuElems: () => {
        return instance.get('/menuItems').then(response => response.data);
    },
};

export const productsAPI = {
    getProducts: () => {
        return instance.get('/products').then(response => response.data);
    },

    addReview: async (productId, review) => {
        const product = await instance.get(`/products/${productId}`).then(res => res.data);

        const newReview = {
            ...review,
            id: `rev-${productId}-${Date.now()}`
        };
        const updatedReviews = [...(product.reviews || []), newReview];

        const updatedProduct = { ...product, reviews: updatedReviews };
        await instance.put(`/products/${productId}`, updatedProduct);

        return newReview;
    },

    deleteProduct: async (id) => {
        return instance.delete(`/products/${id}`);
    },

    addProduct: async (newProduct) => {
        return await instance.post('/products', newProduct);
    }
}

export const imagesAPI = {
    getImagesWithSection: (section) => {
        return instance.get(`/images`).then(response => response.data);
    },
}

export const brandsAPI = {
    getBrands: () => {
        return instance.get(`/brands`).then(response => response.data);
    },

    addBrand: async (brandId, brandName, brandSlug) => {
        const newBrand = {
            id: String(brandId),
            name: brandName,
            slug: brandSlug
        };
        await instance.post('/brands', newBrand);
    },

    deleteBrand: async (item) => {
        await instance.delete(`/brands/${item.id}`);
    }
}

export const categoriesAPI = {
    getCategories: () => {
        return instance.get(`/categories`).then(response => response.data);
    },

    addCategory: async (categoryId, categoryName, categorySlug, categoryParentId) => {
        const newCategory = {
            id: String(categoryId),
            name: categoryName,
            slug: categorySlug,
            parentId: categoryParentId
        };
        await instance.post('/categories', newCategory);
    },

    deleteCategory: async (item) => {
        await instance.delete(`/categories/${item.id}`);
    }
}
