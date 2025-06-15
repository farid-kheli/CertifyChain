import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-heading">CertifyChain</h3>
            <p className="footer-description">
              Securing credentials with blockchain technology, ensuring trust and verification for academic and professional achievements.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#homeSection">Home</a></li>
              <li><a href="#aboutSection">About</a></li>
              <li><a href="#servicesSection">Services</a></li>
              <li><a href="#contactSection">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-text">© 2023 CertifyChain. All rights reserved.</p>
        </div>
      </div>
      
      <style>{`
        .footer {
          padding: 4rem 2rem 2rem;
          background: #1e293b;
          color: white;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .footer-section {
          flex: 1;
          min-width: 250px;
          margin-bottom: 1.5rem;
          padding-right: 2rem;
        }

        .footer-heading {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #f8fafc;
        }

        .footer-description {
          color: #cbd5e1;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-links a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.3s ease;
          font-size: 0.9rem;
        }

        .footer-links a:hover {
          color: #ffffff;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          text-decoration: none;
          transition: background 0.3s ease;
        }

        .social-icon:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .footer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .footer-text {
          font-size: 0.9rem;
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
          }
          
          .footer-section {
            padding-right: 0;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
