import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState(["Hello! How can I assist you?"]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, `User: ${input}`, "Bot: Stay healthy!"]);
      setInput("");
    }
  };

  return (
    <div className="border p-4 rounded-lg mt-4">
      <h2 className="font-semibold">Chatbot</h2>
      <div className="h-40 overflow-y-auto bg-gray-100 p-2 rounded">
        {messages.map((msg, idx) => (
          <p key={idx} className="text-sm">{msg}</p>
        ))}
      </div>
      <input
        className="border p-2 w-full mt-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button className="bg-blue-500 text-white p-2 rounded mt-2 w-full" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
