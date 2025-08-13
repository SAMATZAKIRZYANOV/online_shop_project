import React, { useEffect, useState } from "react";
import { imagesAPI } from "../api/api";
import "../css/HomePage.css"
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export const HomePage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        imagesAPI.getImagesWithSection("home").then((data) => {
            if (data.length > 0) {
                setImages(data[0].home);
            }
        });
    }, []);

    return (
        <div className="page-wrapper">
            <div className="images-wrapper">
                <h3>Товары для активного отдыха</h3>
                {images[0] && (
                    <div className="image-link-wrapper">
                        <img
                            src={images[0].src}
                            alt="TEGRA_NATURE_IMG"
                            className="first-img"
                        />
                        <Link to="/">ПОСМОТРЕТЬ ВСЁ <FaArrowRight /></Link>
                    </div>
                )}
            </div>

            <div className="images-wrapper">
                <h3>Баскетбол</h3>
                {images[1] && (
                    <div className="image-link-wrapper">
                        <img
                            src={images[1].src}
                            alt="TEGRA_SPORT_IMG"
                            className="second-img"
                        />
                        <Link to="/">ПОСМОТРЕТЬ ВСЁ <FaArrowRight /></Link>
                    </div>
                )}
            </div>
        </div>
    );
};
