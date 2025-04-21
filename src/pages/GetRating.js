// GetRating.js
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "../styles/getRating.css";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import AnimatedCard from "../components/AnimatedCard";
import { dynamicUpload } from "../components/util/dynamicUpload";

function GetRating() {
  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState(null);
  const [productLink, setProductLink] = useState("");
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [price, setprice] = useState(null);
  const [material, setMaterial] = useState(null);
  const [title, setTitle] = useState(null);
  const [image_url, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alternativeProducts, setAlternativeProducts] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSteps, setAiSteps] = useState([]);
  const [typedProduct, setTypedProduct] = useState({
    name: "",
    price: "",
    material: "",
    rating: ""
  });
  const [productToUpload, setProductToUpload] = useState(null);
  const [product, setProduct] = useState(null);

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
        { key: "price", text: price },
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
      const response = await axios.post("https://2qztvhxzsw.ap.loclx.io/scrape", {
        url: url,
      });

      const { image_url, material, title, price } = response.data;
      console.log("Scrape API Response:", response.data); // Debugging
      
      if (!material || !title) {
        if (!isAlternative) {
          setError("Web Scrapper failed to fetch product data. Please try again.");
        }
        return;
      }

      if (isAlternative) {
        await rateEco(title, price, material, image_url, url, true);
      } else {
        setProductData({ image_url, material, title, price });
        setImageUrl(image_url);
        setMaterial(material);
        setTitle(title);
        setprice(price);
        setError(null);
        setProductLink(url);
        await rateEco(title, price, material, image_url, url);
      }
    } catch (err) {
      // alert("Python Scrapping Module is responding status code 529! cause of free tier of hosting");
      if (!isAlternative) {
        setError("Failed to fetch product data. Please try again.");
      }
    }
  };

  const rateEco = async (title, price, material, image_url, link, isAlternative = false) => {
    try {
        console.log("Rate() Called");
        
      const response = await axios.post(
        "https://eco-cart-backendnode.onrender.com/gemini-getRating",
        { title, material }
      );

      console.log("Rating API Response:", response.data); // Debugging

      const { rating, description, category } = response.data;
      console.log("Rating Data:", rating, description, category); // Debugging
      
      const parsedRating = parseInt(rating);

      if (isAlternative) {
        const productDetails = {
          img: image_url,
          name: title,
          material,
          rating,
          rating_description: description,
          link,
          price,
        };

        setAlternativeProducts((prev) => [...prev, productDetails]);
        await dynamicUpload(productDetails); // Use the defined productDetails
      } else {
        setRating(parsedRating); // Ensure this is being set
        setDesc(description);
        setMaterial(material);
        setprice(price);
        setTitle(title);
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
            price,
          };

          setProduct(productDetails); // Define and use setProduct
          setProductToUpload(productDetails);
        } else {
          suggestAlternative(category);
        }
      }
    } catch (err) {
      console.error("Error fetching rating:", err);
      if (!isAlternative) setError("Failed to fetch rating. Please try again.");
    }
    finally {
        console.log("Rating fetch completed"); // Debugging
        
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
    setTypedProduct({ name: "", price: "", material: "", rating: "" });
    await scrape(productLink);
  };

  useEffect(() => {
    if (productToUpload) {
      dynamicUpload(productToUpload);
    }
  }, [productToUpload]);

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
                price={price}
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
                      price={alt.price}
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