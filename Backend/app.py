from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from services.model_loader import load_models
from services.predictor import predict_patient
from Chatbot import get_chatbot_reply

app = Flask(__name__)
CORS(app)

# -------------------------
# Load ML models safely
# -------------------------
try:
    models = load_models()
    MODELS_LOADED = True
except Exception as e:
    print(f"Model loading failed: {e}")
    models = None
    MODELS_LOADED = False

USER_CONTEXT = {}

# -------------------------
# Health check
# -------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "API running",
        "models_loaded": MODELS_LOADED
    })

# -------------------------
# Prediction endpoint
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if not MODELS_LOADED:
        return jsonify({
            "error": "ML models not loaded on server"
        }), 503

    data = request.get_json()
    result = predict_patient(data, models)

    USER_CONTEXT.clear()
    USER_CONTEXT.update(result)

    return jsonify(result)

# -------------------------
# Chatbot endpoint
# -------------------------
@app.route("/chat", methods=["POST"])
def chat():
    msg = request.json.get("message", "")

    reply = get_chatbot_reply(msg, USER_CONTEXT)
    return jsonify({"reply": reply})

# -------------------------
# Run server
# -------------------------
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
