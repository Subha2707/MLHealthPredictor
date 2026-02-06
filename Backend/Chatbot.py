import os
from dotenv import load_dotenv
from google import genai

# Load environment variables
load_dotenv()

# Initialize the client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are a medical assistant chatbot.
Rules:
- General advice only.
- No diagnosis.
- Recommend consulting a doctor.
- Short, structured answers.
"""

def get_chatbot_reply(query, user_context):
    disease = user_context.get("final_disease", "Unknown")
    bmi = user_context.get("bmi", "N/A")
    risk = user_context.get("risk_level", "N/A")

    # Construct the message
    full_prompt = f"{SYSTEM_PROMPT}\n\nPatient context:\n- Disease: {disease}\n- BMI: {bmi}\n- Risk: {risk}\n\nUser question:\n{query}"

    try:
        # Use a model name from your specific list (e.g., gemini-2.0-flash)
        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=full_prompt
        )
        return response.text
    except Exception as e:
        return f"Error: {e}"

# Example usage for testing:
if __name__ == "__main__":
    context = {"final_disease": "Hypertension", "bmi": "24.5", "risk_level": "Moderate"}
    print(get_chatbot_reply("What should I eat for breakfast?", context))