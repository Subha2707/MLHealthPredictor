from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import services
from services.model_loader import load_models
from services.predictor import predict_patient
from Chatbot import get_chatbot_reply

# -------------------------
# Initialize Flask
# -------------------------
app = Flask(__name__)

# Allow all origins (safe for student project)
CORS(app, resources={r"/*": {"origins": "*"}})

# -------------------------
# Load ML Models Once
# -------------------------
try:
    models = load_models()
    MODELS_LOADED = True
    print(" Models loaded successfully.")
except Exception as e:
    print(" Model loading failed:", e)
    models = None
    MODELS_LOADED = False

# Store last prediction context for chatbot
USER_CONTEXT = {}

# -------------------------
# Health Check Route
# -------------------------
@app.route("/")
def home():
    return jsonify({
        "status": "API running",
        "models_loaded": MODELS_LOADED
    })

# -------------------------
# Prediction Endpoint
# -------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if not MODELS_LOADED:
        return jsonify({
            "error": "ML models not loaded on server"
        }), 503

    try:
        data = request.get_json()
        result = predict_patient(data, models)

        # Store context for chatbot
        USER_CONTEXT.clear()
        USER_CONTEXT.update(result)

        return jsonify(result)

    except Exception as e:
        print("Prediction error:", e)
        return jsonify({"error": str(e)}), 500


# -------------------------
# Chatbot Endpoint
# -------------------------
@app.route("/chat", methods=["POST"])
def chat():
    try:
        msg = request.json.get("message", "")
        reply = get_chatbot_reply(msg, USER_CONTEXT)
        return jsonify({"reply": reply})

    except Exception as e:
        print("Chat error:", e)
        return jsonify({"error": str(e)}), 500


# -------------------------
# Run Server (Local Only)
# -------------------------
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
