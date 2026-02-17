import pandas as pd

from .utils import bmi_category, health_risk_score
from .disease_ensemble import ensemble_disease_prediction


# -------------------------
# EXPECTED FEATURES
# -------------------------
EXPECTED_FEATURES = [
    "Age",
    "Height_cm",
    "Weight_kg",
    "BP",
    "Sugar",
    "Chol",
    "Days",
    "Visits",
    "Cost",
    "Chronic_Disease",
    "Oxygen_Level",
    "Pulse_Rate",
    "Stress_Level"
]


def align_features(df, model):
    """
    Align dataframe columns exactly to model training order
    """
    expected = model.feature_names_in_
    return df[expected]


def predict_patient(data, models):

    if models is None:
        raise RuntimeError("ML models are not loaded")

    # -------------------------
    # BASIC FEATURES
    # -------------------------
    height_m = data["height_cm"] / 100
    bmi = round(data["weight_kg"] / (height_m ** 2), 2)

    user_df = pd.DataFrame([{
        "Age": data["age"],
        "Height_cm": data["height_cm"],
        "Weight_kg": data["weight_kg"],
        "BP": data["bp"],
        "Sugar": data["sugar"],
        "Chol": data["chol"],
        "Days": data["days"],
        "Visits": data["visits"],
        "Cost": data["cost"]
    }])

    # -------------------------
    # ADD MISSING FEATURES
    # -------------------------
    default_values = {
        "Chronic_Disease": 0,
        "Oxygen_Level": 98,
        "Pulse_Rate": 72,
        "Stress_Level": 1
    }

    for col in EXPECTED_FEATURES:
        if col not in user_df.columns:
            user_df[col] = default_values[col]

    user_df = user_df[EXPECTED_FEATURES]

    # -------------------------
    # CORE ML MODELS
    # -------------------------
    outcome_df = align_features(user_df, models["outcome_model"])
    status_df = align_features(user_df, models["status_model"])
    readmit_df = align_features(user_df, models["readmit_model"])
    recovery_df = align_features(user_df, models["recovery_model"])

    # OUTCOME
    outcome_probs = models["outcome_model"].predict_proba(outcome_df)[0]
    outcome_idx = outcome_probs.argmax()
    outcome_label = models["label_encoders"]["Outcome"].inverse_transform([outcome_idx])[0]
    outcome_conf = round(outcome_probs[outcome_idx] * 100, 2)

    # STATUS
    status_probs = models["status_model"].predict_proba(status_df)[0]
    status_idx = status_probs.argmax()
    status_label = models["label_encoders"]["Status"].inverse_transform([status_idx])[0]
    status_conf = round(status_probs[status_idx] * 100, 2)

    # READMISSION
    readmit_probs = models["readmit_model"].predict_proba(readmit_df)[0]
    readmit_idx = readmit_probs.argmax()
    readmit_label = models["label_encoders"]["Readmitted"].inverse_transform([readmit_idx])[0]
    readmit_conf = round(readmit_probs[readmit_idx] * 100, 2)

    # RECOVERY
    recovery_days = round(float(models["recovery_model"].predict(recovery_df)[0]), 1)

    # -------------------------
    # DISEASE
    # -------------------------
    disease_result = ensemble_disease_prediction(
        user_df,
        models["cluster_model"],
        models["cluster_disease_models"],
        models["label_encoders"]["Disease"]
    )

    
    # -------------------------
    # HEALTH RISK
    # -------------------------
    risk = health_risk_score(
        data["bp"], data["sugar"], data["chol"], data["age"]
    )

    # -------------------------
    # FINAL RESPONSE
    # -------------------------
    return {
        "bmi": bmi,
        "bmi_category": bmi_category(bmi),
        "risk_level": risk,

        "outcome": {
            "prediction": outcome_label,
            "confidence": outcome_conf
        },
        "status": {
            "prediction": status_label,
            "confidence": status_conf
        },
        "readmitted": {
            "prediction": readmit_label,
            "confidence": readmit_conf
        },
        "disease_cluster": models["label_encoders"]["Disease_Cluster"]
            .inverse_transform([disease_result["cluster"]])[0],

        "cluster_confidence": round(disease_result["cluster_prob"] * 100, 2),
        "final_disease": disease_result["final_disease"],
        "top_diseases": disease_result["top_diseases"],
        "expected_recovery_days": recovery_days
    }
