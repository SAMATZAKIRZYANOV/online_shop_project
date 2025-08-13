import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";

const ProfilePageContainer = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/profile/register');
        }
    }, [isAuth, navigate]);

    if (!isAuth) {
        return null;
    }

    return <ProfilePage />;
}

export default ProfilePageContainer;