// GetRating.js
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/getRating.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSteps, setAiSteps] = useState([]);
  const [typedProduct, setTypedProduct] = useState({
    name: "",
    brand: "",
    material: "",
    rating: ""
  });

  useEffect(() => {
    if (isAnalyzing) {
      const steps = [
        "🌱 Initializing sustainability analysis...",
        "🔗 Fetching product from URL...",
        "📦 Analyzing packaging details...",
        "🧪 Identifying materials used...",
        "📊 Calculating eco-score...",
        "💡 Generating recommendations..."
      ];
      
      steps.forEach((step, index) => {
        setTimeout(() => {
          setAiSteps(prev => [...prev, step]);
        }, index * 1500);
      });
    }
  }, [isAnalyzing]);

  useEffect(() => {
    if (productData) {
      const textToType = [
        { key: "name", text: title },
        { key: "brand", text: brand },
        { key: "material", text: material },
        { key: "rating", text: rating }
      ];

      textToType.forEach((item, index) => {
        setTimeout(() => {
          setTypedProduct(prev => ({
            ...prev,
            [item.key]: item.text
          }));
        }, index * 500);
      });
    }
  }, [productData]);

  const scrape = async (url, isAlternative = false) => {
    try {
      const response = await axios.post("http://172.16.254.136:5000/scrape", {
        url: url,
      });

      const { image_url, material, title, brand } = response.data;

      if (!material || !title) {
        if (!isAlternative) {
          setError("Web Scrapper failed to fetch product data. Please try again.");
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

  const rateEco = async (title, brand, material, image_url, link, isAlternative = false) => {
    try {
      const response = await axios.post(
        "https://eco-cart-backendnode.onrender.com/gemini-getRating",
        { title, brand, material }
      );

      console.log("Rating API Response:", response.data); // Debugging

      const { rating, description, category } = response.data;
      const parsedRating = parseInt(rating);

      if (isAlternative) {
        setAlternativeProducts(prev => [...prev, {
          img: image_url,
          name: title,
          material,
          rating,
          rating_description: description,
          link,
          brand,
        }]);
      } else {
        setRating(parsedRating); // Ensure this is being set
        setDesc(description);
        setMaterial(material);
        setBrand(brand);
        setTitle(title);
        setError(null);

        if (parsedRating >= 3) {
          const productDetails = { id: category, name: title, link, img: image_url, rating, description, material };
        } else {
          suggestAlternative(category);
        }
      }
    } catch (err) {
      console.error("Error fetching rating:", err);
      if (!isAlternative) setError("Failed to fetch rating. Please try again.");
    }
  };

  const suggestAlternative = async (category) => {
    try {
      setAlternativeProducts([]);
      setLoading(true);
      const response = await axios.post(
        "https://eco-cart-backendnode.onrender.com/search-product",
        { query: category }
      );
      const alternatives = response.data.products || [];
      const top3Links = alternatives.slice(0, 3).map(product => product.link);
      for (const link of top3Links) await scrape(link, true);
    } catch (err) {
      console.error("Error fetching alternatives:", err);
      setError("Failed to fetch alternatives.");
    } finally {
      setLoading(false);
    }
  };

  const handleRatingFetch = async () => {
    setIsAnalyzing(true);
    setAlternativeProducts([]);
    setAiSteps([]);
    setTypedProduct({ name: "", brand: "", material: "", rating: "" });
    await scrape(productLink);
  };

  return (
    <div className={`get-rating-container ${isAnalyzing ? "analyzing" : ""}`}>
      <div className="analysis-wrapper">
        {/* Input Section */}
        <div className="input-section">
          <div className="rating-card">
            <h1 className="title">Check Eco-Friendliness</h1>
            <p className="subtitle">Paste a product link to check sustainability 🌱</p>
            
            <div className="form-container">
              <SearchBar
                placeholder="Enter product link..."
                onSearch={setProductLink}
              />
              <button className="get-rating-button" onClick={handleRatingFetch}>
                Analyze Sustainability
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}
          </div>
        </div>

        {/* Analysis Section */}
        <div className="analysis-section">
          <div className="ai-process">
            <div className="ai-header">
              <div className="ai-loader"></div>
              <h2>Sustainability Analysis</h2>
            </div>

            <div className="ai-messages">
              {aiSteps.map((step, index) => (
                <div key={index} className="ai-step">
                  <div className="typing-indicator"></div>
                  {step}
                </div>
              ))}
            </div>

            {productData && (
              <AnimatedCard
                img={image_url}
                name={title}
                brand={brand}
                material={material}
                link={productLink}
                rating={rating}
                rating_description={desc}
                ecoBadge={rating > 3}
              />
            )}

            {alternativeProducts.length > 0 && (
              <div className="alternative-products slide-up">
                <h3>Better Alternatives</h3>
                <div className="alternatives-grid">
                  {alternativeProducts.map((alt, index) => (
                    <ProductCard
                      key={index}
                      img={alt.img}
                      name={alt.name}
                      material={alt.material}
                      link={alt.link}
                      rating={alt.rating}
                      rating_description={alt.rating_description}
                      brand={alt.brand}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetRating;