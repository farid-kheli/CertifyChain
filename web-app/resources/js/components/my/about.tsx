import React from 'react';

const About: React.FC = () => {
  

  return (
    <section id="aboutSection" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About CertifyChain</h2>
        <p className="about-tagline">
          Transforming credential verification through blockchain technology
        </p>
        
        <div className="about-main">
          <div className="about-content">
            <h3 className="about-subtitle">Our Mission</h3>
            <p className="about-description">
              CertifyChain leverages blockchain technology to create tamper-proof digital certificates.
              Our platform provides a decentralized solution for issuing, managing, and verifying academic
              and professional credentials, ensuring authenticity and eliminating fraud.
            </p>
            
            <h3 className="about-subtitle">Why Choose Us</h3>
            <ul className="about-features">
              <li>
                <span className="feature-icon"><i className="fas fa-shield-alt"></i></span>
                <div>
                  <h4>Tamper-Proof Security</h4>
                  <p>Credentials stored on blockchain cannot be altered or falsified</p>
                </div>
              </li>
              <li>
                <span className="feature-icon"><i className="fas fa-bolt"></i></span>
                <div>
                  <h4>Instant Verification</h4>
                  <p>Verify credentials in seconds, anywhere in the world</p>
                </div>
              </li>
              <li>
                <span className="feature-icon"><i className="fas fa-globe"></i></span>
                <div>
                  <h4>Global Accessibility</h4>
                  <p>Access your credentials anytime, from any device</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="about-image-container">
            <img 
              src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Blockchain technology illustration" 
              className="about-image"
            />
          </div>
        </div>
        
        <div className="about-values">
          <h3 className="values-title">Our Core Values</h3>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h4>Security</h4>
              <p>We prioritize the security and integrity of credential data above all else.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h4>Trust</h4>
              <p>Building trust through transparent processes and verifiable data.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-cog"></i>
              </div>
              <h4>Innovation</h4>
              <p>Constantly improving our technology to stay at the forefront of digital verification.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h4>Accessibility</h4>
              <p>Making credential verification accessible to everyone, everywhere.</p>
            </div>
          </div>
        </div>
        
        
      </div>
      
      <style>{`
        .about-section {
          padding: 6rem 2rem;
          background: linear-gradient(to bottom, #f8fafc, #f1f5f9);
        }
        
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .about-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .about-tagline {
          font-size: 1.25rem;
          color: #64748b;
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .about-main {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          margin-bottom: 5rem;
          align-items: center;
        }
        
        .about-content {
          flex: 1;
          min-width: 300px;
        }
        
        .about-subtitle {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
        }
        
        .about-description {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        
        .about-features {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .about-features li {
          display: flex;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }
        
        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: #eef2ff;
          color: #667eea;
          border-radius: 50%;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .about-features h4 {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }
        
        .about-features p {
          color: #64748b;
          font-size: 0.95rem;
          margin: 0;
        }
        
        .about-image-container {
          flex: 1;
          min-width: 300px;
          display: flex;
          justify-content: center;
        }
        
        .about-image {
          max-width: 100%;
          border-radius: 8px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .about-values {
          margin-bottom: 5rem;
        }
        
        .values-title, .team-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        
        .value-card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }
        
        .value-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: #eef2ff;
          color: #667eea;
          border-radius: 50%;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .value-card h4 {
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
        }
        
        .value-card p {
          color: #64748b;
          font-size: 0.95rem;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2.5rem;
        }
        
        .team-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
        }
        
        .team-image-container {
          height: 200px;
          overflow: hidden;
        }
        
        .team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .team-card:hover .team-image {
          transform: scale(1.05);
        }
        
        .team-name {
          font-weight: 600;
          color: #1e293b;
          margin: 1.25rem 1.25rem 0.25rem;
        }
        
        .team-role {
          color: #667eea;
          font-size: 0.9rem;
          margin: 0 1.25rem 0.75rem;
        }
        
        .team-bio {
          color: #64748b;
          font-size: 0.9rem;
          padding: 0 1.25rem 1.25rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .about-main {
            flex-direction: column;
          }
          
          .about-image-container {
            order: -1;
            margin-bottom: 2rem;
          }
          
          .values-grid,
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        }
      `}</style>
    </section>
  );
};

export default About;
