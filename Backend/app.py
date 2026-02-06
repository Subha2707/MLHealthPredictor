from flask import Flask, request, jsonify
from flask_cors import CORS

from services.model_loader import load_models
from services.predictor import predict_patient
from Chatbot import get_chatbot_reply

app = Flask(__name__)
CORS(app)

models = load_models()
USER_CONTEXT = {}

@app.route("/")
def home():
    return jsonify({"status": "API running"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    result = predict_patient(data, models)

    USER_CONTEXT.clear()
    USER_CONTEXT.update(result)

    return jsonify(result)

@app.route("/chat", methods=["POST"])
def chat():
    msg = request.json["message"]
    reply = get_chatbot_reply(msg, USER_CONTEXT)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
