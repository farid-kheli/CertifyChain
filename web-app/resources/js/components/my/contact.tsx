import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  // Simplified change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    
    // Simulate form submission
    setFormStatus({ submitted: true, error: false, message: 'Your message has been sent. We\'ll get back to you soon!' });
    
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contactSection" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-description">
          Have questions about CertifyChain? We're here to help and would love to hear from you.
        </p>
        
        <div className="contact-content">
          {formStatus.submitted ? (
            <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
              {formStatus.message}
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john.doe@example.com"
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                  className="form-textarea"
                ></textarea>
              </div>
              
              <div className="contact-info-bottom">
                <div className="contact-methods">
                  <div className="contact-method">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>123 Blockchain Avenue, Tech District, CA 94103</span>
                  </div>
                  <div className="contact-method">
                    <i className="fas fa-envelope"></i>
                    <span>info@certifychain.com</span>
                  </div>
                  <div className="contact-method">
                    <i className="fas fa-phone-alt"></i>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <style>{`
        .contact-section {
          padding: 5rem 2rem;
          background: #f8fafc;
        }
        
        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .contact-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .contact-description {
          font-size: 1.1rem;
          color: #64748b;
          line-height: 1.6;
          max-width: 700px;
          margin: 0 auto 3rem;
          text-align: center;
        }
        
        .contact-content {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .contact-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .form-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .form-row .form-group {
          flex: 1;
          margin-bottom: 0;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #334155;
        }
        
        .form-input,
        .form-textarea,
        .form-select {
          display: block;
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #334155;
          transition: border-color 0.3s ease;
          background-color: #fff;
        }
        
        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
        
        .contact-info-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .contact-method {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748b;
          font-size: 0.9rem;
        }
        
        .contact-method i {
          color: #667eea;
        }
        
        .submit-button {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .submit-button:hover {
          background: #5a67d8;
        }
        
        .form-message {
          padding: 1rem;
          border-radius: 4px;
          font-weight: 500;
          text-align: center;
        }
        
        .form-message.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #86efac;
        }
        
        .form-message.error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }
        
        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .contact-info-bottom {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .contact-methods {
            width: 100%;
            margin-bottom: 1rem;
          }
          
          .submit-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
