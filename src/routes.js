import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { FavoursPage } from "./pages/FavoursPage";
import { CategoryPage } from "./pages/CategoryPage";
import ProfilePageContainer from "./containers/ProfilePageContainer";
import LoginPageContainer from "./containers/LoginPageContainer";
import RegisterPageContainer from "./containers/RegisterPageContainer";
import { ProductPageContainer } from "./containers/ProductPageContainer";
import { PayPage } from "./pages/PayPage";
import { CmsPage } from "./pages/CmsPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/cart" element={<CartPage />}/>
            <Route path="/favours" element={<FavoursPage />}/>
            
            {/* Универсальные маршруты для категорий */}
            <Route path="/:level1" element={<CategoryPage />} />
            <Route path="/:level1/:level2" element={<CategoryPage />} />
            <Route path="/:level1/:level2/:level3" element={<CategoryPage />} />
            
            <Route path="/profile" element={<ProfilePageContainer/>} />
            <Route path="/profile/register" element={<RegisterPageContainer />}/>
            <Route path="/profile/login" element={<LoginPageContainer />}/>

            <Route path="/product/:id" element={<ProductPageContainer />}/>

            <Route path="/pay" element={<PayPage />}/>

            <Route path="/admin/CMS" element={<CmsPage />}/>
        </Routes>
    );  
};

export default AppRouter;