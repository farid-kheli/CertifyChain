import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
interface NavProps {
  auth: {
    user: any | null;
  };
}

const Nav: React.FC<NavProps> = ({ auth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">CertifyChain</div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <button onClick={() => scrollToSection('heroSection')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('aboutSection')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('contactSection')} className="nav-link">Contact</button>
          {auth.user ? (
            <>
              <button className="nav-link" onClick={() => scrollToSection('dashboard')}>Dashboard</button>
              <Link method='post' href='/logout' className="nav-link logout">Logout</Link>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link login">Login</a>
              <button className="nav-link register">Register</button>
            </>
          )}
        </div>
        <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          padding: 1rem 0;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #64748b;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: #1e293b;
        }

        .mobile-menu-button {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
        }

        .mobile-menu-button span {
          width: 100%;
          height: 3px;
          background: #1e293b;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex;
          }

          .nav-links {
            display: none;
          }

          .nav-links.active {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </nav>
  );
};

export default Nav;
