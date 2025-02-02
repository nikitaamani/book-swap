import React from "react";
import "./Termsandcondition.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <card className="terms-card">
        <cardcontent className="terms-content">
          <h1 className="terms-title">Terms and Conditions</h1>
          <p className="terms-text">
            Welcome to our platform. By using our services, you agree to abide by these terms and conditions. Please read them carefully.
          </p>

          <h2 className="terms-subtitle">1. Acceptance of Terms</h2>
          <p className="terms-text">
            By accessing or using our services, you agree to comply with these terms. If you do not agree, please do not use our services.
          </p>

          <h2 className="terms-subtitle">2. User Responsibilities</h2>
          <p className="terms-text">
            You must use the services responsibly and lawfully. Any misuse or unauthorized access may result in termination of your account.
          </p>

          <h2 className="terms-subtitle">3. Payment and Refunds</h2>
          <p className="terms-text">
            Payments are processed securely. Refunds are subject to our refund policy, which you can find on our website.
          </p>

          <h2 className="terms-subtitle">4. Changes to Terms</h2>
          <p className="terms-text">
            We reserve the right to modify these terms at any time. Continued use of our services after changes means you accept the updated terms.
          </p>

          <h2 className="terms-subtitle">5. Privacy Policy</h2>
          <p className="terms-text">
            Your privacy is important to us. We collect and use information as described in our Privacy Policy.
          </p>

          <h2 className="terms-subtitle">6. Termination of Services</h2>
          <p className="terms-text">
            We reserve the right to suspend or terminate your access to our services at any time if you violate these terms.
          </p>

          <h2 className="terms-subtitle">7. Limitation of Liability</h2>
          <p className="terms-text">
            We are not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of our services.
          </p>

          <h2 className="terms-subtitle">8. Governing Law</h2>
          <p className="terms-text">
            These terms shall be governed by and interpreted in accordance with the laws of the jurisdiction in which our company operates.
          </p>
        </cardcontent>
        <div className="terms-footer">
          <button className="terms-button">Accept</button>
        </div>
      </card>
    </div>
  );
};

export default TermsAndConditions;
