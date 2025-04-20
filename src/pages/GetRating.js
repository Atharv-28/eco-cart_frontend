import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/getRating.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { dynamicUpload } from "../components/util/dynamicUpload";
import AnimatedCard from "../components/AnimatedCard";

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
  const [alternativeProducts, setAlternativeProducts] = useState([]);

  const scrape = async (url, isAlternative = false) => {
    try {
      const response = await axios.post("http://172.16.254.136:5000/scrape", {
        url: url,
      });

      const { image_url, material, title, brand } = response.data;

      if (!material || !title) {
        if (!isAlternative) {
          setError(
            "Web Scrapper failed to fetch product data. Please try again."
          );
        }
        return;
      }

      if (isAlternative) {
        await rateEco(title, brand, material, image_url, url, true);
      } else {
        setProductData({ image_url, material, title, brand });
        setImageUrl(image_url);
        setMaterial(material);
        setTitle(title);
        setBrand(brand);
        setError(null);
        setProductLink(url);

        await rateEco(title, brand, material, image_url, url);
      }
    } catch (err) {
      console.error("Error fetching product data:", err);
      if (!isAlternative) {
        setError("Failed to fetch product data. Please try again.");
      }
    }
  };

  const rateEco = async (
    title,
    brand,
    material,
    image_url,
    link,
    isAlternative = false
  ) => {
    try {
      const response = await axios.post(
        "https://eco-cart-backendnode.onrender.com/gemini-getRating",
        {
          title,
          brand,
          material,
        }
      );

      const { rating, description, category } = response.data;
      const parsedRating = parseInt(rating);

      if (isAlternative) {
        setAlternativeProducts((prev) => [
          ...prev,
          {
            img: image_url,
            name: title,
            material,
            rating,
            rating_description: description,
            link,
            brand,
          },
        ]);
      } else {
        setRating(rating);
        setDesc(description);
        setError(null);

        if (parsedRating >= 3) {
          const productDetails = {
            id: category,
            name: title,
            link,
            img: image_url,
            rating,
            description,
            material,
          };
        //   await dynamicUpload(productDetails);
        } else {
          suggestAlternative(category);
        }
      }
    } catch (err) {
      console.error("Error fetching rating and review:", err);
      if (!isAlternative) {
        setError("Failed to fetch rating and review. Please try again.");
      }
    }
  };

  const suggestAlternative = async (category) => {
    try {
      if (!category) {
        setError("Invalid category for suggesting alternatives.");
        return;
      }

      setAlternativeProducts([]);
      setLoading(true);

      const response = await axios.post(
        "https://eco-cart-backendnode.onrender.com/search-product",
        {
          query: category,
        }
      );
      console.log("Response from alternative products:", response.data);

      const alternatives = response.data.products || [];

      const top3Links = alternatives.slice(0, 3).map((product) => product.link);

      for (const link of top3Links) {
        await scrape(link, true);
      }
    } catch (err) {
      console.error("Error fetching alternative products:", err);
      setError("Failed to fetch alternative products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingFetch = async () => {
    setAlternativeProducts([]);
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
          //   <ProductCard
          //     img={image_url}
          //     name={title}
          //     material={material}
          //     link={productLink}
          //     rating={rating}
          //     rating_description={desc}
          //     brand={brand}
          //   />
          <AnimatedCard
            img={image_url}
            name={title}
            brand={brand}
            material={material}
            link={productLink}
            rating={rating}
            rating_description={desc}
          />
        )}

        {alternativeProducts.length > 0 && (
          <div className="alternative-products-container">
            <h3>Alternative Products</h3>
            <div className="alternative-products">
              {alternativeProducts.map((alt, index) => (
                <div key={index} className="alternative-product-card">
                  <ProductCard
                    img={alt.img}
                    name={alt.name}
                    material={alt.material}
                    link={alt.link}
                    rating={alt.rating}
                    rating_description={alt.rating_description}
                    brand={alt.brand}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="note">
          We analyze packaging, materials & sustainability scores 🌍
        </p>
      </div>
    </div>
  );
}

export default GetRating;