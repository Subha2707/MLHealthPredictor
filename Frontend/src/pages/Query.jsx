import { useState } from "react";
import { BsRobot } from "react-icons/bs";
import { HiMiniBeaker } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import { sendChatMessage } from "../services/api";

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

    const userMessage = message;

    setChat((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const data = await sendChatMessage(userMessage);

      setChat((prev) => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: error.message || "Chatbot is unavailable." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">
        <BsRobot /> Health Query Assistant
      </h1>

      <p className="page-subtitle">
        Ask questions based on your health prediction
      </p>

      {!CHATBOT_ENABLED && (
        <div className="info-card" style={{ marginBottom: "15px" }}>
          <p>
            ⚠️ The intelligent chatbot is disabled on this version.
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
                : "Chatbot disabled"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            disabled={!CHATBOT_ENABLED || loading}
          />

          <div className="chat-actions">
            <button
              type="submit"
              className="primary-btn"
              disabled={loading || !CHATBOT_ENABLED}
            >
              {loading ? "Asking..." : "Ask"}
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
