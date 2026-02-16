const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined in environment variables");
}

// Generic API handler
const handleResponse = async (response) => {
  let data;

  try {
    data = await response.json();
  } catch (error) {
    throw new Error("Invalid JSON response from server",error);
  }

  if (!response.ok) {
    throw new Error(
      data?.details ||
      data?.error ||
      "Server Error"
    );
  }

  return data;
};

// ------------------------
// Predict API
// ------------------------
export const predictHealth = async (payload) => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

// ------------------------
// Chat API
// ------------------------
export const sendChatMessage = async (message) => {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return handleResponse(response);
};
