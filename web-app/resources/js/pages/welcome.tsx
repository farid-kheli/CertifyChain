import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Nav from '@/components/my/nav';
import Hero from '@/components/my/hero';
import CertificateCard from '@/components/my/card';
import About from '@/components/my/about';
import Contact from '@/components/my/contact';
import Footer from '@/components/my/footer';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [walletAddress, setWalletAddress] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [certificates, setCertificates] = useState([]);
    
    const searchCertificates = async (address: string) => {
        setWalletAddress(address);
        setIsSearching(true);

        try {
            // This will be replaced with actual smart contract call
            // For example:
            // const results = await yourSmartContractInstance.getCertificates(address);
            // setCertificates(results);
            
            // Temporary placeholder for smart contract integration
            setTimeout(() => {
                setCertificates([]);
                setIsSearching(false);
                setShowResults(true);
                
                // Scroll to results section
                setTimeout(() => {
                    document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }, 1500);
        } catch (error) {
            console.error("Error fetching certificates:", error);
            setIsSearching(false);
        }
    };
    
    const createSparkle = (x: number, y: number) => {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = 'linear-gradient(45deg, #00d4ff, #a855f7)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    };
    
    // Add mousemove effect
    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (Math.random() > 0.98) {
                createSparkle(e.clientX, e.clientY);
            }
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <Head title="BlockCertify - NFT Certificate Verification" />
            
            {/* CSS Styles */}
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 50%, #0f0f2a 100%);
                    min-height: 100vh;
                    overflow-x: hidden;
                    position: relative;
                }

               

                .floating-elements {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 2;
                }

                .hologram {
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: linear-gradient(45deg, #00d4ff, #a855f7);
                    border-radius: 50%;
                    animation: float 6s ease-in-out infinite;
                    opacity: 0.6;
                }

                .hologram:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
                .hologram:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
                .hologram:nth-child(3) { top: 70%; left: 20%; animation-delay: 2s; }
                .hologram:nth-child(4) { top: 80%; left: 70%; animation-delay: 3s; }
                .hologram:nth-child(5) { top: 40%; left: 90%; animation-delay: 4s; }
                .hologram:nth-child(6) { top: 60%; left: 5%; animation-delay: 5s; }

                .circuit-line {
                    position: absolute;
                    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
                    height: 1px;
                    animation: circuit 8s linear infinite;
                    opacity: 0.3;
                }

                .circuit-line:nth-child(7) { top: 25%; width: 100px; left: -100px; }
                .circuit-line:nth-child(8) { top: 65%; width: 150px; left: -150px; animation-delay: 2s; }
                .circuit-line:nth-child(9) { top: 45%; width: 80px; left: -80px; animation-delay: 4s; }

                /* Main container */
                .container {
                    position: relative;
                    z-index: 10;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                /* Header */
                .header {
                    text-align: center;
                    margin-bottom: 3rem;
                    animation: fadeInUp 1s ease-out;
                }

                .logo {
                    font-size: 2.5rem;
                    font-weight: 700;
                    background: linear-gradient(45deg, #00d4ff, #a855f7);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 0.5rem;
                    text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
                }

                .subtitle {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.1rem;
                    font-weight: 300;
                }

                /* Main verification section */
                .verification-section {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 24px;
                    padding: 3rem;
                    width: 100%;
                    max-width: 600px;
                    box-shadow: 
                        0 8px 32px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    animation: fadeInUp 1s ease-out 0.3s both;
                    position: relative;
                    overflow: hidden;
                }

                .verification-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent);
                    animation: shimmer 3s ease-in-out infinite;
                    pointer-events: none;
                }

                .section-title {
                    text-align: center;
                    color: white;
                    font-size: 1.8rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
                }

                .input-group {
                    position: relative;
                    margin-bottom: 2rem;
                }

                .input-field {
                    width: 100%;
                    padding: 1.2rem 1.5rem;
                    background: rgba(0, 0, 0, 0.3);
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    color: white;
                    font-size: 1rem;
                    font-family: 'Courier New', monospace;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .input-field:focus {
                    outline: none;
                    border-color: #00d4ff;
                    box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
                    background: rgba(0, 0, 0, 0.5);
                }

                .input-field::placeholder {
                    color: rgba(255, 255, 255, 0.5);
                }

                .search-button {
                    width: 100%;
                    padding: 1.2rem;
                    background: linear-gradient(45deg, #00d4ff, #a855f7);
                    border: none;
                    border-radius: 16px;
                    color: white;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .search-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s ease;
                }

                .search-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
                }

                .search-button:hover::before {
                    left: 100%;
                }

                .search-button:active {
                    transform: translateY(0);
                }

                /* Results section */
                .results-section {
                    margin: 2rem auto 4rem;
                    width: 100%;
                    max-width: 1200px;
                    padding: 0 2rem;
                    animation: fadeInUp 1s ease-out 0.6s both;
                }

                .results-title {
                    text-align: center;
                    color: white;
                    font-size: 2rem;
                    font-weight: 600;
                    margin-bottom: 2rem;
                    background: linear-gradient(45deg, #ffffff, #a0e9ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 2rem;
                }

                /* Animations */
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

                @keyframes pulse {
                    0% { opacity: 0.1; }
                    100% { opacity: 0.3; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }

                @keyframes circuit {
                    0% { left: -100px; }
                    100% { left: 100%; }
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
                }

                @keyframes sparkle {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1) rotate(180deg);
                        opacity: 0;
                    }
                }

                /* Smooth scroll behavior for the entire page */
                html {
                    scroll-behavior: smooth;
                }

                /* Responsive design */
                @media (max-width: 768px) {
                    .container {
                        padding: 1rem;
                    }
                    
                    .verification-section {
                        padding: 2rem;
                    }
                    
                    .logo {
                        font-size: 2rem;
                    }
                    
                    .section-title {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
            
            
            
            <div className="floating-elements">
                <div className="hologram"></div>
                <div className="hologram"></div>
                <div className="hologram"></div>
                <div className="hologram"></div>
                <div className="hologram"></div>
                <div className="hologram"></div>
                <div className="circuit-line"></div>
                <div className="circuit-line"></div>
                <div className="circuit-line"></div>
            </div>

            <Nav auth={auth} />
            
            {/* Hero Section with ID for navigation */}
            <section id="heroSection">
                <Hero onSearch={searchCertificates} isSearching={isSearching} />
            </section>

            {/* Results Section */}
            <section 
                className="results-section" 
                id="resultsSection" 
                style={{ display: showResults ? 'block' : 'none' }}
            >
                <h2 className="results-title">
                    {certificates.length > 0 
                        ? `Certificates for ${walletAddress}` 
                        : `No certificates found for ${walletAddress}`}
                </h2>
                <div className="results-grid">
                    {certificates.map((cert, index) => (
                        <CertificateCard 
                            key={index}
                            certificate={cert}
                            index={index}
                        />
                    ))}
                </div>
            </section>
            
            {/* About Section */}
            <About />
            
            {/* Contact Section */}
            <Contact />
            
            {/* Footer */}
            <Footer />
        </>
    );
}
