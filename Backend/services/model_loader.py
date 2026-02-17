import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.getenv("MODEL_DIR", os.path.join(BASE_DIR, "models"))


def load_models():
    model_path = os.path.join(MODEL_DIR, "health_models.pkl")

    if not os.path.exists(model_path):
        raise RuntimeError(
            f"Model file not found at {model_path}. "
            "Ensure health_models.pkl is present."
        )

    models = joblib.load(model_path)

    print("Models loaded successfully!")
    return models
