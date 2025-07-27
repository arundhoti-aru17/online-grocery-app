import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Helpbox() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  const generateContent = async () => {
    if (!title.trim()) return toast.error("Please enter a message.");
    try {
      setLoading(true);
      setMessages(prev => [...prev, { type: "user", text: title }]);

      const { data } = await axios.post("/api/help/generate", { prompt: title });

      if (data.success) {
        setMessages(prev => [...prev, { type: "bot", text: data.content }]);
        setTitle('');
      } else {
        toast.error(data.message || "Error from backend");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') generateContent();
  };

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
   <div className="max-h-[100%] py-2 mb-2">
     <div className="max-w-xl mx-auto py-2 px-2 min-h-[300px]">
      <h1 className="text-2xl font-semibold mb-4 text-center">How to Prepare</h1>

      {/* Chat Messages Box */}
      <div
        className="bg-gray-100 rounded p-3 min-h-[500px] overflow-y-auto mb-3 border border-gray-300 shadow-inner flex flex-col"
        ref={chatRef}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-[75%] whitespace-pre-wrap text-sm font-sans ${
              msg.type === "user" ? "bg-blue-100 self-end ml-auto" : "bg-gray-200"
            }`}
          >
            <pre className="whitespace-pre-wrap">{msg.text}</pre>
          </div>
        ))}
        {loading && (
          <div className="text-gray-400 text-sm italic mt-2">Typing...</div>
        )}
      </div>

      {/* Input + Button */}
      <div className="w-full max-w-2xl flex items-center mt-2 ">
        <div className="flex items-center h-12 w-full text-sm text-gray-700 bg-white border border-gray-300 rounded shadow-sm  mt-2 mb-0">
        <button type="button" className="h-full px-3 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
          </svg>
        </button>
        <input
          className="outline-none bg-transparent h-full flex-1 px-2"
          type="text"
          placeholder="What are you craving for?..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          disabled={loading}
          onClick={generateContent}
          className="min-h-[30%] px-4 text-blue-600 font-medium disabled:opacity-50"
        >
          Send
        </button>
      </div>
      </div>
    </div>
   </div>
  );
}
