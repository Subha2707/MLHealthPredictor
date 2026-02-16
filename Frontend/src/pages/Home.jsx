import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictHealth } from "../services/api";
import { LuNotebookPen } from "react-icons/lu";
import { FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const [heightUnit, setHeightUnit] = useState("cm");

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
      const finalHeight =
        heightUnit === "ft"
          ? Number(form.height_cm) * 30.48
          : Number(form.height_cm);

      const result = await predictHealth({
        ...form,
        age: Number(form.age),
        height_cm: finalHeight,
        weight_kg: Number(form.weight_kg),
        bp: Number(form.bp),
        sugar: Number(form.sugar),
        chol: Number(form.chol),
        days: Number(form.days),
        visits: Number(form.visits),
        cost: Number(form.cost)
      });

      localStorage.setItem("prediction", JSON.stringify(result));
      navigate("/results");
    } catch (err) {
      setError(err.message || "Prediction failed.");
    } finally {
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
        <h2><LuNotebookPen /> Patient Information</h2>

        <div className="grid-3">

          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
            placeholder="Age (years)"
            required
          />

          {/* HEIGHT WITH TOOLTIP + UNIT */}
          <div className="input-wrapper">
            <input
              type="number"
              placeholder={heightUnit === "cm" ? "Height (cm)" : "Height (ft)"}
              value={form.height_cm}
              onChange={(e) =>
                setForm({ ...form, height_cm: e.target.value })
              }
              required
            />

            <select
              className="unit-select"
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
            >
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>

            <div className="tooltip">
              {heightUnit === "ft"
                ? "1 ft = 30.48 cm"
                : "Example: 170 cm ≈ 5.6 ft"}
            </div>
          </div>

          <input
            name="weight_kg"
            value={form.weight_kg}
            onChange={handleChange}
            type="number"
            placeholder="Weight (kg)"
            required
          />

          {/* BLOOD PRESSURE */}
          <div className="input-wrapper">
            <input
              name="bp"
              value={form.bp}
              onChange={handleChange}
              type="number"
              placeholder="Blood Pressure (systolic)"
              required
              className={
                form.bp && Number(form.bp) >= 130
                  ? "input-warning"
                  : ""
              }
            />
            {form.bp && Number(form.bp) >= 130 && (
              <FaExclamationTriangle className="warning-icon" />
            )}
            <div className="tooltip">
              Normal: Below 130 mmHg
            </div>
          </div>

          {/* SUGAR */}
          <div className="input-wrapper">
            <input
              name="sugar"
              value={form.sugar}
              onChange={handleChange}
              type="number"
              placeholder="Sugar Level (mg/dL)"
              required
              className={
                form.sugar && Number(form.sugar) >= 126
                  ? "input-warning"
                  : ""
              }
            />
            {form.sugar && Number(form.sugar) >= 126 && (
              <FaExclamationTriangle className="warning-icon" />
            )}
            <div className="tooltip">
              Fasting normal: 70–99 mg/dL
            </div>
          </div>

          {/* CHOLESTEROL */}
          <div className="input-wrapper">
            <input
              name="chol"
              value={form.chol}
              onChange={handleChange}
              type="number"
              placeholder="Cholesterol (mg/dL)"
              required
              className={
                form.chol && Number(form.chol) >= 240
                  ? "input-warning"
                  : ""
              }
            />
            {form.chol && Number(form.chol) >= 240 && (
              <FaExclamationTriangle className="warning-icon" />
            )}
            <div className="tooltip">
              Normal: Below 200 mg/dL
            </div>
          </div>

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
