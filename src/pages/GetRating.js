import React, { useState } from "react";
import '../styles/getRating.css';

function GetRating() {
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState(null);
    const [productLink, setProductLink] = useState("");

    const handleRatingFetch = () => {
        // Placeholder for Firebase functionality
        // Simulating a response for demonstration
        setRating(4.5);  // Example rating from database
        setReview("This product is highly recommended for eco-conscious buyers. It’s sustainable and made from recycled materials.");
    };

    return (
        <div className="get-rating-page">
            <div className="rating-card">
                <h1 className="title">Check Eco-Friendliness</h1>
                <p className="subtitle">Paste a product link below to check how eco-friendly it is 🌱</p>
                
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Enter product link"
                        className="product-link-input"
                        value={productLink}
                        onChange={(e) => setProductLink(e.target.value)}
                    />
                    <button className="get-rating-button" onClick={handleRatingFetch}>
                        Get Rating
                    </button>
                </div>

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
