export const predictHealth = async (data) => {
  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;

  try {
    result = await response.json(); // ✅ await is CRITICAL
  } catch (err) {
    throw new Error("Invalid JSON response from server",err);
  }

  if (!response.ok) {
    throw new Error(
      result?.details ||
      result?.error ||
      "Server Error"
    );
  }

  return result; // ✅ always return parsed object
};
