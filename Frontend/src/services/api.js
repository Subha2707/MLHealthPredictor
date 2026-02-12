const API_URL = import.meta.env.VITE_API_URL;

export const predictHealth = async (data) => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;

  try {
    result = await response.json(); 
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

  return result; 
};
