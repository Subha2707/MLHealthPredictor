from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are a medical assistant chatbot.

Formatting rules:
- Use short paragraphs
- Use bullet points where appropriate
- Use numbered lists for steps
- Highlight section titles in bold
- Do NOT write long paragraphs
- Keep answers clean and structured

Medical rules:
- Give general health advice only
- Do NOT diagnose diseases
- Always recommend consulting a doctor
"""

def get_chatbot_reply(query, user_context):
    disease = user_context.get("final_disease", "Unknown")
    bmi = user_context.get("bmi", "N/A")
    risk = user_context.get("risk_level", "N/A")

    prompt = f"""
{SYSTEM_PROMPT}

User health summary:
Predicted disease: {disease}
BMI: {bmi}
Risk level: {risk}

User question:
{query}
"""

    response = client.models.generate_content(
        model="models/gemini-flash-latest",
        contents=prompt
    )

    return response.text
