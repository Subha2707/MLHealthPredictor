# ML Health Predictor & Intelligent Health Assistant

This project is an AI-powered healthcare system that combines **machine learning–based disease prediction** with an **intelligent chatbot assistant**. The system analyzes patient data to predict health outcomes and provides personalized, educational health guidance.

---

## 🔍 Key Features

- ML-based disease prediction from patient health data
- Prediction of:
  - Final disease
  - Risk level
  - BMI and health status
  - Expected recovery days
- Context-aware health assistant chatbot
- Chatbot powered by a **local LLM (Ollama)** for privacy and offline usage
- Clean separation of backend (Flask) and frontend (React)

---

## 🧠 Technologies Used

- **Python**, Flask
- **Machine Learning (scikit-learn)**
- **React.js**
- **Ollama (Local LLM)**
- Pandas, NumPy

---

## 📊 Dataset

The dataset used for training and evaluation is included in this repository for **academic and reproducibility purposes**.

---

## ⚠️ Important Note

- ML model files (`.pkl`) are intentionally **excluded from GitHub**
- To run predictions, trained model files must be placed manually inside the `Backend/models/` directory
- The chatbot provides **educational guidance only** and does **not replace medical professionals**

---

## ▶️ How to Run (Basic)

1. Clone the repository
2. Install backend dependencies
3. Add trained ML model files to `Backend/models/`
4. Start Flask backend
5. Start React frontend

---

## 📌 Disclaimer

This project is intended for **educational and research purposes only**.  
It does not provide medical diagnosis or treatment.

---

## 👨‍💻 Author

Developed as an academic and learning project in Machine Learning and AI.
