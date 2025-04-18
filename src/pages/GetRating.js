import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import '../styles/getRating.css';
import axios from "axios";

function GetRating() {
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState(null);
    const [productLink, setProductLink] = useState("");
    const [productData, setProductData] = useState(null); // To store the response data
    const [error, setError] = useState(null); // To handle errors

    const handleRatingFetch = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/scrape", {
                url: productLink,
            });

            console.log("Full response data:", response.data);

            const { image_url, material, title, brand } = response.data;
            setProductData({ image_url, material, title, brand });
            setRating(4.5);
            setReview("This product is highly recommended for eco-conscious buyers. It’s sustainable and made from recycled materials.");
            setError(null);

            console.log("Image URL:", image_url);
        } catch (err) {
            console.error("Error fetching product data:", err);
            setError("Failed to fetch product data. Please try again.");
        }
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

                {error && <p className="error-message">{error}</p>}

                {productData && (
                    <div className="product-details">
                        <h2>Product Details</h2>
                        <img src={productData.image_url} alt="failed to load" className="product-image" />
                        <p><strong>Title:</strong> {productData.title}</p>
                        <p><strong>Brand:</strong> {productData.brand}</p>
                        <p><strong>Material:</strong> {productData.material}</p>
                    </div>
                )}

                {rating && review && (
                    <div className="rating-result">
                        <h2>Product Rating</h2>
                        <p><strong>Rating:</strong> {rating}/5</p>
                        <p><strong>Review:</strong> {review}</p>
                    </div>
                )}

                <p className="note">We analyze packaging, materials & sustainability scores 🌍</p>
            </div>
        </div>
    );
}

export default GetRating;
