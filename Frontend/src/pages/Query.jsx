import { useState } from "react";
import {BsRobot} from "react-icons/bs";
import { HiMiniBeaker } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";

const Query = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const clearInput = () => {
    setMessage("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChat((prev) => [...prev, { sender: "user", text: message }]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again.",err}
      ]);
    }

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="page">
      <h1 className="page-title"><BsRobot /> Health Query Assistant</h1>
      <p className="page-subtitle">
        Ask questions based on your health prediction
      </p>

      <div className="card chat-card">
        <div className="chat-box">
          {chat.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.sender}`}>
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {loading && <div className="chat-msg bot"><HiMiniBeaker />Typing...</div>}
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <textarea
            placeholder="Describe your health concern..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            required
          />
          <div className="chat-actions">
            <button className="primary-btn" disabled={loading}>
              {loading ? "Thinking..." : "Ask"}
            </button>

            <button
              type="button"
              className="primary-btn"
              onClick={clearInput}
              disabled={loading || !message}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Query;
