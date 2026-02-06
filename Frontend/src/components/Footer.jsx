import { FaCopyright, FaHospital} from "react-icons/fa";
import { FaHouseMedicalCircleExclamation } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left */}
        <div className="footer-brand">
          <h3><FaHospital/> HealthPredict</h3>
          <p>
            AI-powered hospital health and disease prediction system designed
            for educational and research purposes.
          </p>
        </div>

        {/* Middle */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Results</p>
          <p>BMI Analysis</p>
          <p>Ask Query</p>
          <p>Contact</p>
        </div>

        {/* Right */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: hospital@example.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          <FaCopyright/> {new Date().getFullYear()} Hospital Health Prediction System
        </p>
        <p className="footer-note">
          <FaHouseMedicalCircleExclamation/> This system does not replace professional medical consultation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
