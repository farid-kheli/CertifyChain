import { useState } from 'react';

interface HeroProps {
    onSearch: (address: string) => void;
    isSearching: boolean;
    onConnectWallet?: () => void;
}

export default function Hero({ onSearch, isSearching, onConnectWallet }: HeroProps) {
    const [walletAddress, setWalletAddress] = useState('');
    const [inputError, setInputError] = useState('');
    
    const validateAddress = (address: string) => {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    };

    const handleSearch = () => {
        if (!walletAddress.trim()) {
            setInputError('Please enter a wallet address');
            return;
        }
        
        if (!validateAddress(walletAddress)) {
            setInputError('Please enter a valid Ethereum wallet address');
            return;
        }
        
        setInputError('');
        onSearch(walletAddress.trim());
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalletAddress(e.target.value);
        if (inputError) setInputError('');
    };

    const features = [
        {
            icon: '🛡️',
            title: 'Immutable Security',
            description: 'Certificates stored on blockchain cannot be altered or forged'
        },
        {
            icon: '⚡',
            title: 'Instant Verification',
            description: 'Real-time validation of certificate authenticity and ownership'
        },
        {
            icon: '🌐',
            title: 'Global Access',
            description: 'Verify certificates from anywhere in the world, 24/7'
        },
        {
            icon: '📊',
            title: 'Complete Transparency',
            description: 'Full audit trail and transaction history available'
        }
    ];

    const stats = [
        { number: '250K+', label: 'Certificates Verified' },
        { number: '15K+', label: 'Active Users' },
        { number: '99.9%', label: 'Uptime' },
        { number: '50+', label: 'Partner Institutions' }
    ];

    return (
        <>
            <style>{`
                * {
                    box-sizing: border-box;
                }
                
                body {
                    margin: 0;
                    background: #f8fafc;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                }

                .hero-section {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    position: relative;
                    overflow: hidden;
                }

                .hero-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: 
                        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
                    background-size: 200px 200px;
                }

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
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .logo::before {
                    content: '🏆';
                    font-size: 1.8rem;
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
                }

                .nav-link:hover {
                    color: #1e293b;
                }

                .connect-wallet-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(102, 126, 234, 0.2);
                }

                .connect-wallet-btn:hover {
                    background: #5a67d8;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
                }

                .hero-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 8rem 2rem 4rem;
                    position: relative;
                    z-index: 1;
                }

                .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    margin-bottom: 6rem;
                }

                .hero-content {
                    color: white;
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.2);
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    margin-bottom: 1.5rem;
                    backdrop-filter: blur(10px);
                }

                .hero-badge::before {
                    content: '🚀';
                }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-description {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .hero-features {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .feature-tag {
                    background: rgba(255, 255, 255, 0.15);
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.9rem;
                    backdrop-filter: blur(10px);
                }

                .verification-panel {
                    background: white;
                    border-radius: 16px;
                    padding: 2.5rem;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                }

                .panel-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .panel-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 0.5rem;
                }

                .panel-subtitle {
                    color: #64748b;
                    font-size: 0.95rem;
                }

                .verification-form {
                    margin-bottom: 2rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-label {
                    display: block;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }

                .form-input {
                    width: 100%;
                    padding: 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    background: #f9fafb;
                    font-family: 'Fira Code', monospace;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #667eea;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .form-input.error {
                    border-color: #ef4444;
                    background: #fef2f2;
                }

                .error-message {
                    color: #ef4444;
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .verify-btn {
                    width: 100%;
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .verify-btn:hover:not(:disabled) {
                    background: #5a67d8;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                }

                .verify-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s linear infinite;
                }

                .verification-info {
                    background: #f8fafc;
                    border-radius: 8px;
                    padding: 1rem;
                }

                .info-title {
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }

                .info-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    font-size: 0.85rem;
                    color: #64748b;
                }

                .info-list li {
                    margin-bottom: 0.25rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .info-list li::before {
                    content: '✓';
                    color: #22c55e;
                    font-weight: bold;
                }

                .features-section {
                    background: white;
                    border-radius: 16px;
                    padding: 3rem;
                    margin-bottom: 4rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }

                .features-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .features-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1e293b;
                    margin-bottom: 1rem;
                }

                .features-subtitle {
                    color: #64748b;
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                }

                .feature-card {
                    text-align: center;
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid #e5e7eb;
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    border-color: #667eea;
                }

                .feature-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    display: block;
                }

                .feature-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #1e293b;
                    margin-bottom: 0.5rem;
                }

                .feature-description {
                    color: #64748b;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .stats-section {
                    background: #1e293b;
                    border-radius: 16px;
                    padding: 3rem;
                    color: white;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    text-align: center;
                }

                .stat-item {
                    padding: 1rem;
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #667eea;
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 768px) {
                    .hero-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                        text-align: center;
                    }

                    .hero-container {
                        padding: 6rem 1rem 2rem;
                    }

                    .nav-container {
                        padding: 0 1rem;
                    }

                    .nav-links {
                        display: none;
                    }

                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .hero-description {
                        font-size: 1.1rem;
                    }

                    .verification-panel {
                        padding: 1.5rem;
                    }

                    .features-section,
                    .stats-section {
                        padding: 2rem 1rem;
                        margin: 0 1rem 2rem;
                    }

                    .features-grid {
                        grid-template-columns: 1fr;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }

                    .stat-number {
                        font-size: 2rem;
                    }
                }
            `}</style>

            

            <section className="hero-section">
                <div className="hero-pattern"></div>
                
                <div className="hero-container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="hero-badge">
                                Trusted by 50+ Educational Institutions
                            </div>
                            
                            <h1 className="hero-title">
                                Verify Blockchain Certificates with Complete Confidence
                            </h1>
                            
                            <p className="hero-description">
                                CertifyChain provides enterprise-grade blockchain certificate verification, 
                                ensuring authenticity, preventing fraud, and delivering instant validation 
                                for educational credentials, professional certifications, and digital achievements.
                            </p>
                            
                            <div className="hero-features">
                                <span className="feature-tag">🔒 Tamper-Proof</span>
                                <span className="feature-tag">⚡ Instant Verification</span>
                                <span className="feature-tag">🌍 Global Standard</span>
                                <span className="feature-tag">📈 Analytics Dashboard</span>
                            </div>
                        </div>

                        <div className="verification-panel">
                            <div className="panel-header">
                                <h2 className="panel-title">Verify Certificate</h2>
                                <p className="panel-subtitle">
                                    Enter a wallet address to view all verified certificates and credentials
                                </p>
                            </div>

                            <div className="verification-form">
                                <div className="form-group">
                                    <label className="form-label">Ethereum Wallet Address</label>
                                    <input
                                        type="text"
                                        className={`form-input ${inputError ? 'error' : ''}`}
                                        placeholder="0x742d35Cc6084C2532F0E1C9F2f853c2Bb79DcFa8"
                                        value={walletAddress}
                                        onChange={handleInputChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        disabled={isSearching}
                                    />
                                    {inputError && (
                                        <div className="error-message">
                                            ⚠️ {inputError}
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="verify-btn"
                                    onClick={handleSearch}
                                    disabled={isSearching || !walletAddress.trim()}
                                >
                                    {isSearching ? (
                                        <>
                                            <span className="loading-spinner"></span>
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            🔍 Verify Certificates
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="verification-info">
                                <div className="info-title">What you'll see:</div>
                                <ul className="info-list">
                                    <li>Certificate details and metadata</li>
                                    <li>Issuing institution information</li>
                                    <li>Verification timestamp and status</li>
                                    <li>Transaction history and proof</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="features-section">
                        <div className="features-header">
                            <h2 className="features-title">Why Choose CertifyChain?</h2>
                            <p className="features-subtitle">
                                Our platform combines cutting-edge blockchain technology with intuitive design 
                                to deliver the most reliable certificate verification system available.
                            </p>
                        </div>

                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-card">
                                    <span className="feature-icon">{feature.icon}</span>
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stats-section">
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
