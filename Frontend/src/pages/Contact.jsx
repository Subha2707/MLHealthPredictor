import { useState } from "react";
import { FaAmbulance, FaCheckCircle, FaHospital } from "react-icons/fa";


const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        Get in touch with our hospital support team
      </p>

      <div className="grid-2">
        
        <div className="card">
          <h3><FaHospital/> Hospital Information</h3>
          <p><b>Email:</b> hospital@example.com</p>
          <p><b>Phone:</b> +91 98765 43210</p>
          <p><b>Address:</b> City Hospital, India</p>

          <div className="emergency-box">
            <FaAmbulance/> Emergency Support: <b>24/7 Available</b>
          </div>
        </div>

       
        <div className="card">
          {sent && (
            <p className="success-text">
              <FaCheckCircle/> Message sent successfully. We’ll contact you soon.
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <input placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required />
            <button className="primary-btn" style={{ width: "100%" }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
