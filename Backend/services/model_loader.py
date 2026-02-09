import joblib
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.getenv("MODEL_DIR", os.path.join(BASE_DIR, "models"))


def load_models():
    if not os.path.exists(MODEL_DIR):
        raise RuntimeError(
            f"Model directory not found at {MODEL_DIR}. "
            "Ensure trained model files are available."
        )

    return {
        "outcome": joblib.load(os.path.join(MODEL_DIR, "outcome.pkl")),
        "status": joblib.load(os.path.join(MODEL_DIR, "status.pkl")),
        "readmit": joblib.load(os.path.join(MODEL_DIR, "readmit.pkl")),
        "recovery": joblib.load(os.path.join(MODEL_DIR, "recovery_days.pkl")),
        "disease_model": joblib.load(os.path.join(MODEL_DIR, "disease_cluster_model.pkl")),
        "cluster_disease_models": joblib.load(
            os.path.join(MODEL_DIR, "cluster_disease_models.pkl")
        ),
        "encoders": joblib.load(os.path.join(MODEL_DIR, "label_encoders.pkl"))
    }
