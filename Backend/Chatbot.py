import ollama


SYSTEM_PROMPT = """
You are a friendly, intelligent medical assistant chatbot.

Rules:
- Use clear paragraphs and bullet points
- Be concise but helpful
- Answer based on the patient's predicted condition and health data
- Give practical advice (diet, lifestyle, precautions)
- DO NOT give diagnosis or prescriptions
- Always add a short medical disclaimer at the end
"""


def build_context_prompt(context):
    return f"""
Patient Health Summary:
- Predicted Disease: {context.get("final_disease")}
- BMI: {context.get("bmi")} ({context.get("bmi_category")})
- Risk Level: {context.get("risk_level")}
- Outcome: {context.get("outcome", {}).get("prediction")}
- Status: {context.get("status", {}).get("prediction")}
- Expected Recovery Days: {context.get("expected_recovery_days")}

Use this information to personalize your answers.
"""


def get_chatbot_reply(message, context):
    prompt = f"""
{build_context_prompt(context)}

User Question:
{message}

Answer in a friendly chatbot style using:
- short paragraphs
- bullet points where useful
"""

    response = ollama.chat(
        model="phi3:mini",   
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ]
    )

    return response["message"]["content"] + (
        "\n\n⚠️ *This information is for educational purposes only. "
        "Please consult a qualified medical professional.*"
    )
