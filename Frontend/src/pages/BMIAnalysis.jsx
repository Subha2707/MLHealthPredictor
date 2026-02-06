import { FaBrain, FaExclamationTriangle, FaHeartbeat } from "react-icons/fa";
import { LuCandy } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const BMIAnalysis = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("prediction"));

  if (!data) {
    return (
      <div className="page">
        <h2>No BMI data available</h2>
        <p>Please submit patient details first.</p>
        <button className="primary-btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  // BMI range mapping (15 – 40)
  const minBMI = 15;
  const maxBMI = 40;
  const bmiPercent = Math.min(
    Math.max(((data.bmi - minBMI) / (maxBMI - minBMI)) * 100, 0),
    100
  );

  return (
    <div className="page">
      <h1 className="page-title">BMI & Health Analysis</h1>
      <p className="page-subtitle">Comprehensive health metrics overview</p>

      {/* BMI CARD */}
      <div className="card" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", color: "#0b5ed7" }}>
          {data.bmi}
        </h1>
        <p>Body Mass Index</p>

        <div className="bmi-bar" style={{ margin: "25px 0" }}>
          <div
            className="bmi-marker"
            style={{ left: `${bmiPercent}%` }}
          />
        </div>

        <span className={`badge ${
          data.bmi_category === "Normal" ? "badge-green" :
          data.bmi_category === "Overweight" ? "badge-orange" :
          "badge-red"
        }`}>
          {data.bmi_category}
        </span>
      </div>

      {/* HEALTH METRICS */}
      <div className="grid-3" style={{ marginTop: "30px" }}>
        <div className="info-card">
          <h3><FaExclamationTriangle/> Overall Health Risk</h3>
          <span className={`badge ${
            data.risk_level === "Low Risk" ? "badge-green" :
            data.risk_level === "Medium Risk" ? "badge-orange" :
            "badge-red"
          }`}>
            {data.risk_level}
          </span>
        </div>

        <div className="info-card">
          <h3><FaHeartbeat/> Blood Pressure</h3>
          <p>{data.bp > 140 ? "High" : "Normal"}</p>
        </div>

        <div className="info-card">
          <h3><LuCandy/> Sugar Level</h3>
          <p>{data.sugar > 140 ? "High" : "Normal"}</p>
        </div>

        <div className="info-card">
          <h3><FaBrain/> Disease Category</h3>
          <p>{data.disease_cluster}</p>
        </div>

      </div>
    </div>
  );
};

export default BMIAnalysis;
