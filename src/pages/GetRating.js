import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import '../styles/getRating.css';
import axios from "axios";

function GetRating() {
    const [rating, setRating] = useState(null);
    const [desc, setDesc] = useState(null);
    const [productLink, setProductLink] = useState("");
    const [productData, setProductData] = useState(null); // To store the response data
    const [error, setError] = useState(null); // To handle errors
    const [loading, setLoading] = useState(false); // To manage the loader state

    const scrape = async (url) => {
        try {
            setLoading(true); // Start the loader
            const response = await axios.post("http://127.0.0.1:5000/scrape", {
                url: productLink,
            });

            console.log("Full response data:", response.data);

            const { image_url, material, title, brand } = response.data;
            setProductData({ image_url, material, title, brand });
            setError(null);

            await rateEco(title, brand, material); // Wait for rateEco to complete
        } catch (err) {
            console.error("Error fetching product data:", err);
            setError("Failed to fetch product data. Please try again.");
        } finally {
            setLoading(false); // Stop the loader
        }
    };

    const rateEco = async (title, brand, material) => {
        try {
            const response = await axios.post("http://127.0.0.1:3000/gemini-test", {
                title: title,
                brand: brand,
                material: material,
            });
            console.log("Rating API response:", response.data);
            const { rating , description } = response.data;
            setRating(rating);
            setDesc(description);
            setError(null);
        } catch (err) {
            console.error("Error fetching rating and review:", err);
            setError("Failed to fetch rating and review. Please try again.");
        }
    };

    const handleRatingFetch = async () => {
        scrape(productLink);
    };

    return (
        <div className="get-rating-page">
            <div className="rating-card">
                <h1 className="title">Check Eco-Friendliness</h1>
                <p className="subtitle">Paste a product link below to check how eco-friendly it is 🌱</p>
                
                <div className="form-container">
                    <SearchBar
                        placeholder="Enter product link..."
                        onSearch={setProductLink}
                    />
                    <button className="get-rating-button" onClick={handleRatingFetch}>
                        Get Rating
                    </button>
                </div>

                {loading && <p className="loading-message">Loading...</p>} {/* Loader */}

                {error && <p className="error-message">{error}</p>}

                {productData && (
                    <>
                    <div className="product-details">
                        <h2>Product Details</h2>
                        <img src={productData.image_url} alt="failed to load" className="product-image" />
                        <p><strong>Title:</strong> {productData.title}</p>
                        <p><strong>Brand:</strong> {productData.brand}</p>
                        <p><strong>Material:</strong> {productData.material}</p>
                    </div>
                    <div className="rating-result">
                        <h2>Product Rating</h2>
                        <p>{rating}</p>
                        <p><strong>Review:</strong> {desc}</p>
                    </div>
                    </>
                    
                )}

                <p className="note">We analyze packaging, materials & sustainability scores 🌍</p>
            </div>
        </div>
    );
}

export default GetRating;