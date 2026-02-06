import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictHealth } from "../services/api";
import { LuNotebookPen } from "react-icons/lu";


const Home = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    height_cm: "",
    weight_kg: "",
    bp: "",
    sugar: "",
    chol: "",
    days: "",
    visits: "",
    cost: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await predictHealth({
        ...form,
        age: Number(form.age),
        height_cm: Number(form.height_cm),
        weight_kg: Number(form.weight_kg),
        bp: Number(form.bp),
        sugar: Number(form.sugar),
        chol: Number(form.chol),
        days: Number(form.days),
        visits: Number(form.visits),
        cost: Number(form.cost)
      });

      console.log("Prediction result:", result);

      if (!result || typeof result !== "object") {
        throw new Error("Invalid prediction data");
      }

      localStorage.setItem("prediction", JSON.stringify(result));
      navigate("/results");
    } 
    catch (err) {
      console.error(err);
      setError(err.message || "Prediction failed. Please check your inputs.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Hospital Health Prediction System</h1>
      <p className="page-subtitle">
        AI-powered patient health and disease prediction
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2><LuNotebookPen/> Patient Information</h2>

        <div className="grid-3">
          <input name="age" value={form.age} onChange={handleChange} type="number" placeholder="Age (years)" required />
          <input name="height_cm" value={form.height_cm} onChange={handleChange} type="number" placeholder="Height (cm)" required />
          <input name="weight_kg" value={form.weight_kg} onChange={handleChange} type="number" placeholder="Weight (kg)" required />

          <input name="bp" value={form.bp} onChange={handleChange} type="number" placeholder="Blood Pressure (systolic)" required />
          <input name="sugar" value={form.sugar} onChange={handleChange} type="number" placeholder="Sugar Level (mg/dL)" required />
          <input name="chol" value={form.chol} onChange={handleChange} type="number" placeholder="Cholesterol (mg/dL)" required />

          <input name="days" value={form.days} onChange={handleChange} type="number" placeholder="Hospital Stay Days" required />
          <input name="visits" value={form.visits} onChange={handleChange} type="number" placeholder="Number of Visits" required />
          <input name="cost" value={form.cost} onChange={handleChange} type="number" placeholder="Treatment Cost ($)" required />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-btn" disabled={loading}>
          {loading ? "Predicting..." : "Predict Health"}
        </button>
      </form>
    </div>
  );
};

export default Home;
