import React, { useState, useEffect } from "react";
import "./TalkAi.css";

const TalkAi = () => {
  const [messages, setMessages] = useState([
    { text: "Welcome to the AI Fitness Freak! Ask me anything about your nutrition.", sender: "ai" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { text: inputText, sender: "user" }];
    setMessages(newMessages);
    setInputText("");

    setTimeout(() => {
      let reply =
        "This is a sample response from the Nutrition AI! Ask me about your diet, and I will provide suggestions.";

      if (inputText.toLowerCase().includes("hi") || inputText.toLowerCase().includes("hello")) {
        reply = "Hello! I am your AI-powered nutrition assistant. How can I help you today?";
      }

      setMessages([...newMessages, { text: reply, sender: "ai" }]);
    }, 1000);
  };

  return (
    <div className="chatbox-container">
      <h1 className="chat-title">Welcome to AI Fitness Freak Nutrition Chatbot</h1>

      <div id="chat" className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender === "user" ? "user-bubble" : "ai-bubble"}`}>
            {msg.sender === "user" && <img src="userlogo.jpg" alt="User" className="user-logo" />}
            <span>{msg.text}</span>
            {msg.sender === "ai" && <img src="logo.jpg" alt="AI" className="ai-logo" />}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Ask about your diet..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TalkAi;
