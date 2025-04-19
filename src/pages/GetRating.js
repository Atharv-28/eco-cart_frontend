import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/getRating.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function GetRating() {
  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState(null);
  const [productLink, setProductLink] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [brand, setBrand] = useState(null);
  const [material, setMaterial] = useState(null);
  const [title, setTitle] = useState(null);
  const [image_url, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const scrape = async (url) => {
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/scrape", {
        url: productLink,
      });

      console.log("Full response data:", response.data);

      const { image_url, material, title, brand } = response.data;
      setProductData({ image_url, material, title, brand });
      setImageUrl(image_url);
      setMaterial(material);
      setTitle(title);
      setBrand(brand);
      setError(null);
      console.log("Scraped data:", { image_url, material, title, brand });

      if (!material || !title) {
        setError(
          "Web Scrapper failed to fetch product data. Please try again."
        );
        return;
      }

      await rateEco(title, brand, material);
    } catch (err) {
      console.error("Error fetching product data:", err);
      setError("Failed to fetch product data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const rateEco = async (title, brand, material) => {
    try {
        const response = await axios.post("http://127.0.0.1:3000/gemini-getRating", {
            title: title,
            brand: brand,
            material: material,
        });
        console.log("Rating API response:", response.data);

        const { rating, description } = response.data;

        const parsedRating = parseInt(rating);

        console.log("Parsed rating:", parsedRating);

        // Store the rating and description in state
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
        <p className="subtitle">
          Paste a product link below to check how eco-friendly it is 🌱
        </p>

        <div className="form-container">
          <SearchBar
            placeholder="Enter product link..."
            onSearch={setProductLink}
          />
          <button className="get-rating-button" onClick={handleRatingFetch}>
            Get Rating
          </button>
        </div>

        {loading && <p className="loading-message">Loading...</p>}

        {error && <p className="error-message">{error}</p>}

        {!error && productData && (
          <ProductCard
            img={image_url}
            name={title}
            material={material}
            link={productLink}
            rating={rating}
            rating_description={desc}
            brand={brand}
          />
        )}

        <p className="note">
          We analyze packaging, materials & sustainability scores 🌍
        </p>
      </div>
    </div>
  );
}

export default GetRating;
