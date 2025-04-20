import React, { useState, useEffect } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showChatbox, setShowChatbox] = useState(false);

  useEffect(() => {
    // Show chatbox after animations
    const chatboxTimeout = setTimeout(() => {
      setShowChatbox(true); // Ensure this is triggered
    }, 3000); // Wait for animations to complete

    return () => {
      clearTimeout(chatboxTimeout);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');

    // Simulate backend response  https://eco-cart-backendnode.onrender.com
    const response = await fetch('http://127.0.0.1:3000/chatbot-getRating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input }),
    });

    const data = await response.json();
    const botMessage = { sender: 'bot', text: data.response };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbox-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
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