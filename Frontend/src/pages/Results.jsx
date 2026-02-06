import { useNavigate } from "react-router-dom";
import {
  FaVirus,
  FaBrain,
  FaChartLine,
  FaExclamationTriangle,
  FaRedo,
  FaClock,
  FaRobot,
  FaBars
} from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";


const Results = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("prediction"));

  if (!data) {
    return (
      <div className="page">
        <h2>No prediction data found</h2>
        <p>Please submit patient information first.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Prediction Results</h1>
      <p className="page-subtitle">Based on the patient data provided</p>

      {/* Final Disease */}
      <div className="highlight-card">
        <p><FaVirus/> Final Disease Prediction</p>
        <h2>{data.final_disease}</h2>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          className="primary-btn"
          onClick={() => navigate("/query")}
        >
          <FaRobot /> Ask Health Assistant
        </button>
      </div>

      {/* Result Cards */}
      <div className="grid-3">
        
        {/* Disease Cluster */}
        <div className="info-card">
          <h3><FaBrain/> Disease Category (AI Cluster)</h3>
          <h2>{data.disease_cluster}</h2>
          <small>
            Confidence: {data.cluster_confidence}%
          </small>
        </div>

        {/* Top Diseases */}
        <div className="info-card">
          <h3><IoBarChartSharp /> Top 3 Predicted Diseases</h3>
          {data.top_diseases.map((disease, index) => (
            <p key={index}>
              {index + 1}. {disease.name} – {disease.probability}%
            </p>
          ))}
        </div>

        {/* Outcome */}
        <div className="info-card">
          <h3><FaChartLine/> Outcome Prediction</h3>
          <h2>{data.outcome.prediction}</h2>
          <small>Confidence: {data.outcome.confidence}%</small>
        </div>

        {/* Status */}
        <div className="info-card">
          <h3><FaExclamationTriangle/> Status Prediction</h3>
          <h2>{data.status.prediction}</h2>
          <small>Confidence: {data.status.confidence}%</small>
        </div>
      </div>

      {/* Extra Info */}
      <div className="grid-2" style={{ marginTop: "30px" }}>
        <div className="info-card">
          <h3><FaRedo/> Readmission Risk</h3>
          <h2>{data.readmitted.prediction}</h2>
          <small>Confidence: {data.readmitted.confidence}%</small>
        </div>

        <div className="info-card">
          <h3><FaClock/> Expected Recovery</h3>
          <h2>{data.expected_recovery_days} Days</h2>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button className="primary-btn" onClick={() => navigate("/bmi")}>
          View BMI & Health Analysis
        </button>
      </div>
    </div>
  );
};

export default Results;
