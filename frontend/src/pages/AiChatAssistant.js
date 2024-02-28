import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/chatAi.css';

const AiChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Add a welcome message from the bot when the page loads
    setTimeout(() => {
      const welcomeMessage = { text: "Hello, Dear Teacher! How can I assist you today ? 😊", sender: 'bot' };
      setMessages([welcomeMessage]);
    }, 1000);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add user message to display
    setMessages([...messages, { text: userInput, sender: 'user' }]);

    // Generate dummy response from the bot
    const botMessage = "This is a dummy message from the bot.";

    // Add the bot message to display
    setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);

    setUserInput(''); // Clear input field
  };

  return (
    <div className='chat-container'>
      <Sidebar />
      <div className="chat-content">
        <h2>Chat with your AI Assistant</h2>
        <div id="chat-display">
            {messages.map((message, index) => (
              <p key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
                {message.text}
              </p>
            ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default AiChatAssistant;