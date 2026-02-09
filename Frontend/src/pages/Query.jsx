import { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { HiMiniBeaker } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";

const Query = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const CHATBOT_ENABLED = import.meta.env.VITE_ENABLE_CHATBOT === "true";

  const clearInput = () => {
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !CHATBOT_ENABLED) return;

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
        { sender: "bot", text: "Chatbot is unavailable on the hosted server." ,err}
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

      
      {!CHATBOT_ENABLED && (
        <div className="info-card" style={{ marginBottom: "15px" }}>
          <p>
            ⚠️ The intelligent chatbot runs <b>locally</b> using a private AI model.
            <br />
            It is disabled on the hosted version for stability and cost reasons.
          </p>
        </div>
      )}

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

          {loading && (
            <div className="chat-msg bot">
              <HiMiniBeaker /> Typing...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="chat-input">
          <textarea
            placeholder={
              CHATBOT_ENABLED
                ? "Describe your health concern..."
                : "Chatbot is disabled on hosted version"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            disabled={!CHATBOT_ENABLED}
          />

          <div className="chat-actions">
            <button
              className="primary-btn"
              disabled={loading || !CHATBOT_ENABLED}
            >
              Ask
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
