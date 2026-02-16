import os
from groq import Groq

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not set in environment variables")

client = Groq(api_key=GROQ_API_KEY)


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
    """

    chat_completion = client.chat.completions.create(
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        model="llama-3.1-8b-instant",  
    )

    return chat_completion.choices[0].message.content + (
        "\n\n⚠️ *This information is for educational purposes only.*"
    )
