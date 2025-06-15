import React from 'react';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  hash: string;
  status: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  return (
    <>
      <style>{`
        .certificate-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 1s ease-out ${0.1 * index}s both;
        }

        .certificate-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 212, 255, 0.2);
          border-color: rgba(0, 212, 255, 0.4);
        }

        .certificate-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #00d4ff, #a855f7);
        }

        .certificate-title {
          color: white;
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .certificate-details {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .certificate-hash {
          font-family: 'Courier New', monospace;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem;
          border-radius: 8px;
          margin-top: 1rem;
          font-size: 0.8rem;
          word-break: break-all;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="certificate-card">
        <h3 className="certificate-title">{certificate.title}</h3>
        <div className="certificate-details">
          <p><strong>Issuer:</strong> {certificate.issuer}</p>
          <p><strong>Issue Date:</strong> {certificate.date}</p>
          <p><strong>Status:</strong> <span style={{ color: '#00d4ff' }}>{certificate.status}</span></p>
        </div>
        <div className="certificate-hash">
          <strong>Token Hash:</strong><br />
          {certificate.hash}
        </div>
      </div>
    </>
  );
}
