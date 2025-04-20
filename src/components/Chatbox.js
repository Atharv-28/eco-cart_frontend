import React, { useState, useEffect } from "react";
import "./Chatbox.css";

const Chatbox = ({ productName, brand, material }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChatbox, setShowChatbox] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // State for typing animation

  // Save props in state
  const [productDetails, setProductDetails] = useState({
    productName: "",
    brand: "NA",
    material: "",
  });

  useEffect(() => {
    // Initialize product details state with props
    setProductDetails({ productName, brand, material });

    // Show chatbox after animations
    const chatboxTimeout = setTimeout(() => {
      setShowChatbox(true);
    }, 3000);

    return () => {
      clearTimeout(chatboxTimeout);
    };
  }, [productName, brand, material]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      // Show typing animation
      setIsTyping(true);

      // Send request to chatbot-getRating with product details from state
      const response = await fetch(
        "https://eco-cart-backendnode.onrender.com/chatbot-getRating",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: input,
            productName: productDetails.productName,
            brand: productDetails.brand,
            material: productDetails.material,
          }),
        }
      );

      console.log(productDetails.productName);
      console.log(productDetails.material);
      console.log(input);

      const data = await response.json();
      console.log("Chatbot response:", data);

      // Simulate typing delay
      setTimeout(() => {
        setIsTyping(false); // Hide typing animation
        const botMessage = { sender: "bot", text: data.response };
        setMessages((prev) => [...prev, botMessage]);
      }, 1500); // Adjust delay as needed
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setIsTyping(false); // Hide typing animation
      const botMessage = {
        sender: "bot",
        text: "An error occurred. Please try again later.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbox-message ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="chatbox-message bot typing-indicator">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        )}
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the product..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
