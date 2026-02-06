def bmi_category(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif bmi < 25:
        return "Normal"
    elif bmi < 30:
        return "Overweight"
    return "Obese"


def health_risk_score(bp, sugar, chol, age):
    score = 0
    if bp > 140: score += 2
    if sugar > 140: score += 2
    if chol > 200: score += 1
    if age > 60: score += 2

    if score <= 2:
        return "Low Risk"
    elif score <= 5:
        return "Medium Risk"
    return "High Risk"
