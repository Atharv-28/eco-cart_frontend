import React, { useState, useEffect } from "react";
import "./Chatbox.css";

const Chatbox = ({ productName, price, material }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChatbox, setShowChatbox] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // State for typing animation
  const [productDetails, setProductDetails] = useState({
    productName: "",
    price: "NA",
    material: "",
  });

  useEffect(() => {
    setProductDetails({ productName, price, material });

    const chatboxTimeout = setTimeout(() => {
      setShowChatbox(true);
    }, 3000);

    return () => {
      clearTimeout(chatboxTimeout);
    };
  }, [productName, price, material]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      setIsTyping(true);

      const response = await fetch(
        "https://eco-cart-backendnode.onrender.com/chatbot-getRating",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: input,
            productName: productDetails.productName,
            price: productDetails.price,
            material: productDetails.material,
          }),
        }
      );

      const data = await response.json();

      setTimeout(() => {
        setIsTyping(false);
        simulateTypingAnimation(data.response);
      }, 1500);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setIsTyping(false);
      const botMessage = {
        sender: "bot",
        text: "An error occurred. Please try again later.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const simulateTypingAnimation = (text) => {
    let index = 0;
    const botMessage = { sender: "bot", text: "" };
    setMessages((prev) => [...prev, botMessage]);

    const interval = setInterval(() => {
      if (index < text.length) {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage.sender === "bot") {
            lastMessage.text = text.slice(0, index + 1); // Append the next character
          }
          return updatedMessages;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust typing speed here
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
