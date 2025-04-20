// components/ChatBot.js
import { useState, useRef, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import './Chatbot.css'; 
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage = {
      text: inputMessage,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');

    // Add temporary bot response (typing animation)
    const tempBotMessage = {
      text: '...',
      isBot: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, tempBotMessage]);

    try {
      // Make POST request to /chatbot-general
      const response = await axios.post('https://eco-cart-backendnode.onrender.com/chatbot-general', {
        query: inputMessage,
      });

      // Simulate typing delay
      setTimeout(() => {
        // Replace tempBotMessage with actual bot response
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            text: response.data.response, // Replace with actual response
            isBot: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return updatedMessages;
        });
      }, 1500); // Adjust delay as needed
    } catch (error) {
      console.error('Error communicating with chatbot:', error);

      // Replace tempBotMessage with an error message
      setMessages((prev) => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          text: 'An error occurred. Please try again later.',
          isBot: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return updatedMessages;
      });
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Eco Assistant</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                <div className="message-content">
                  <p>{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <FiSend />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          className="chat-icon"
          onClick={() => setIsOpen(true)}
        >
          <FiMessageSquare />
        </button>
      )}
    </div>
  );
};

export default ChatBot;