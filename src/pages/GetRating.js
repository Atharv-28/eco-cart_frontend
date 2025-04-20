import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import '../styles/getRating.css';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function GetRatingAnimated() {
  const [step, setStep] = useState(0); // 0: input, 1: AI process, 2: result
  const [productLink, setProductLink] = useState('');
  const [messages, setMessages] = useState([]);
  const [productData, setProductData] = useState(null);
  const [rating, setRating] = useState(null);
  const [desc, setDesc] = useState('');
  const [altProducts, setAlternativeProducts] = useState([]);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [material, setMaterial] = useState(null);
  const [title, setTitle] = useState(null);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  const aiSteps = [
    'AI is thinking...',
    'Fetching product from URL...',
    'Fetching title...',
    'Identifying material used...',
    'Rating the product...',
  ];

  const scrape = async (url, isAlternative = false) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/scrape", {
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

  const startProcess = () => {
    setStep(1); // Move to the AI processing step
    setMessages(aiSteps); // Set AI steps as messages
    handleRatingFetch(); // Start fetching the rating
  };

  const handleRatingFetch = async () => {
    setAlternativeProducts([]);
    scrape(productLink);
  };

  return (
    <div className="get-rating-animated">
      <AnimatePresence>
        {step === 0 && (
          <motion.div className="panel panel-left"
            initial={{ x: 0 }} animate={{ x: 0 }} exit={{ x: '-100%' }}>
            <div className="input-box">
              <h2>Check Eco-Friendliness</h2>
              <SearchBar placeholder="Enter product URL..." onSearch={setProductLink} />
              <button className="btn btn-success mt-3" onClick={startProcess} disabled={!productLink}>
                Get Rating
              </button>
            </div>
          </motion.div>
        )}

        {step >= 1 && (
          <>
            <motion.div className="panel panel-left"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}>
              {step < 2 ? (
                <div className="ai-messages">
                  {messages.map((m, i) => <p key={i}>{m}</p>)}
                </div>
              ) : (
                <motion.div className="product-display" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ProductCard {...{
                    id: productData.category || 'Eco',
                    name: productData.title,
                    link: productLink,
                    img: productData.image_url,
                    rating,
                    rating_description: desc,
                    material: productData.material
                  }} />
                  {rating >= 3 && (
                    <motion.img src="/eco-badge.png" alt="Badge"
                      className="eco-badge"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }} />
                  )}
                </motion.div>
              )}
            </motion.div>

            <motion.div className="panel panel-right"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
              <div className="chat-container">
                <h3>AI Assistant</h3>
                {messages.map((m, i) => <p key={i}>{m}</p>)}
                {step === 2 && <p>How can I help further?</p>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {step === 2 && altProducts.length > 0 && (
        <div className="alternative-section">
          <h4>Alternative Products</h4>
          <div className="alt-grid">
            {altProducts.map((prod, i) => (
              <ProductCard key={i} {...{
                id: prod.id, name: prod.name, link: prod.link,
                img: prod.img, rating: prod.rating,
                rating_description: prod.description, material: prod.material
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
