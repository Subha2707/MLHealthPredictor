import { FaBrain, FaCheck, FaExclamationCircle } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { IoRocket } from "react-icons/io5";

const About = () => {
  return (
    <div className="page">
      <h1 className="page-title">About the System</h1>
      <p className="page-subtitle">
        Understanding the purpose and intelligence behind the health prediction platform
      </p>

      <div className="card about-section">
        <h2><TbTargetArrow/> Purpose of the System</h2>
        <p>
          The Hospital Health Prediction System is an AI-powered web application
          designed to assist healthcare professionals and patients in early disease
          detection and health risk assessment.
        </p>
        <p>
          By analyzing multiple patient health parameters such as age, body metrics,
          blood pressure, sugar levels, cholesterol, and hospital history, the system
          provides predictive insights that support proactive healthcare decisions.
        </p>
      </div>

      <div className="card about-section">
        <h2><FaBrain/> How Machine Learning Helps</h2>
        <p>
          This system uses trained machine learning models that analyze patterns
          from historical medical data. These models can identify correlations
          between health indicators and disease outcomes that may not be easily
          noticeable through manual analysis.
        </p>

        <ul className="about-list">
          <li><FaCheck/> Analyzes patient vitals and medical history</li>
          <li><FaCheck/>  Identifies disease patterns and risk levels</li>
          <li><FaCheck/>  Predicts possible outcomes and recovery duration</li>
          <li><FaCheck/> Provides confidence scores for transparency</li>
        </ul>
      </div>

      <div className="card about-section">
        <h2><FaExclamationCircle/> Medical Disclaimer</h2>
        <p className="disclaimer">
          This system is developed strictly for educational and research purposes.
          It is not intended to replace professional medical diagnosis, treatment,
          or advice.
        </p>
        <p className="disclaimer">
          Users are strongly advised to consult qualified healthcare professionals
          before making any medical decisions based on the predictions provided by
          this system.
        </p>
      </div>

      <div className="card about-section">
        <h2><IoRocket/> Future Enhancements</h2>
        <ul className="about-list">
          <li><FaCheck/> Integration with real hospital databases</li>
          <li><FaCheck/> Doctor consultation module</li>
          <li><FaCheck/> Medical report download feature</li>
          <li><FaCheck/> Patient health history tracking</li>
          <li><FaCheck/> Advanced visual analytics</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
