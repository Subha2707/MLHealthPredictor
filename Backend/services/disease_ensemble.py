import numpy as np

def ensemble_disease_prediction(user_df, cluster_model, cluster_disease_models, disease_encoder):

    
    cluster_df = user_df[cluster_model.feature_names_in_]

    cluster = cluster_model.predict(cluster_df)[0]
    cluster_prob = float(max(cluster_model.predict_proba(cluster_df)[0]))

    
    disease_model = cluster_disease_models.get(cluster)

    if disease_model is None:
        return {
            "cluster": cluster,
            "cluster_prob": cluster_prob,
            "final_disease": "Unknown",
            "top_diseases": []
        }

    
    disease_df = user_df[disease_model.feature_names_in_]

    probs = disease_model.predict_proba(disease_df)[0]
    top3_idx = np.argsort(probs)[-3:][::-1]

    top_diseases = [
        {
            "name": disease_encoder
                .inverse_transform([disease_model.classes_[i]])[0],
            "probability": round(float(probs[i]) * 100, 2)
        }
        for i in top3_idx
    ]

    return {
        "cluster": cluster,
        "cluster_prob": cluster_prob,
        "final_disease": top_diseases[0]["name"],
        "top_diseases": top_diseases
    }
