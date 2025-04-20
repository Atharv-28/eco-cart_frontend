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
  const [altProducts, setAltProducts] = useState([]);

  const aiSteps = [
    'AI is thinking...',
    'Fetching product from URL...',
    'Fetching title...',
    'Identifying material used...',
    'Rating the product...',
  ];

  const startProcess = () => {
    setMessages([]);
    setStep(1);
  };

  useEffect(() => {
    if (step === 1) {
      // show AI messages one by one
      aiSteps.forEach((msg, idx) => {
        setTimeout(() => {
          setMessages(prev => [...prev, msg]);
          if (idx === aiSteps.length - 1) {
            // after AI steps, fetch real data
            fetchData();
          }
        }, idx * 1500);
      });
    }
  }, [step]);

  const fetchData = async () => {
    try {
      const scrapeRes = await axios.post('http://127.0.0.1:5000/scrape', { url: productLink });
      const { title, material, image_url, brand } = scrapeRes.data;
      const rateRes = await axios.post('https://eco-cart-backendnode.onrender.com/gemini-getRating', { title, brand, material });
      const { rating, description, category } = rateRes.data;
      setProductData({ title, material, image_url, brand });
      setRating(rating);
      setDesc(description);
      // simulate alternative fetch if rating <3
      if (rating < 3) {
        const altRes = await axios.post('https://eco-cart-backendnode.onrender.com/search-product', { query: category });
        setAltProducts(altRes.data.products.slice(0,3));
      }
      setStep(2);
    } catch (e) {
      console.error(e);
    }
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
                  {messages.map((m,i) => <p key={i}>{m}</p>)}
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
                {messages.map((m,i) => <p key={i}>{m}</p>)}
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
            {altProducts.map((prod,i) => (
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
