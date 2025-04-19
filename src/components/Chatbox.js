import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput('');

    // Simulate backend response
    const response = await fetch('http://127.0.0.1:3000/chat', {
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