import { useState, useEffect } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type Certificate = {
    id: number;
    title: string;
    date: string;
    isPublic: boolean;
    ipfsHash: string;
};

const sampleCertificates: Certificate[] = [
    {
        id: 1,
        title: "Solidity Course Completion",
        date: "2024-03-15",
        isPublic: true,
        ipfsHash: "QmX7Y8Z9..."
    },
    {
        id: 2,
        title: "Web3 Development Certification",
        date: "2024-02-28",
        isPublic: false,
        ipfsHash: "QmA1B2C3..."
    },
    {
        id: 3,
        title: "Smart Contract Security Audit",
        date: "2024-01-20",
        isPublic: true,
        ipfsHash: "QmD4E5F6..."
    },
    {
        id: 4,
        title: "DeFi Protocol Certification",
        date: "2024-01-10",
        isPublic: true,
        ipfsHash: "QmG7H8I9..."
    },
    {
        id: 5,
        title: "NFT Development Workshop",
        date: "2023-12-05",
        isPublic: false,
        ipfsHash: "QmJ1K2L3..."
    },
    {
        id: 6,
        title: "Blockchain Architecture Design",
        date: "2023-11-18",
        isPublic: true,
        ipfsHash: "QmM4N5O6..."
    }
];

export default function Dashboard() {
    const [certificates, setCertificates] = useState<Certificate[]>(sampleCertificates);
    const [notification, setNotification] = useState<string | null>(null);

    const togglePrivacy = (certId: number) => {
        setCertificates(prev => 
            prev.map(cert => 
                cert.id === certId ? { ...cert, isPublic: !cert.isPublic } : cert
            )
        );
        
        setTimeout(() => {
            const cert = certificates.find(c => c.id === certId);
            if (cert) {
                showNotification(`Certificate privacy updated to ${!cert.isPublic ? 'Public' : 'Private'}`);
            }
        }, 2000);
    };

    const viewOnIPFS = (hash: string) => {
        showNotification(`Opening certificate on IPFS: ${hash}`);
        window.open(`https://ipfs.io/ipfs/${hash}`, '_blank');
    };

    const changeWallet = () => {
        showNotification('Wallet connection modal would open here');
    };

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const totalCerts = certificates.length;
    const publicCerts = certificates.filter(cert => cert.isPublic).length;
    const privateCerts = totalCerts - publicCerts;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Certificates | CertVault" />
            
            {/* Main dashboard content with animated background */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto relative bg-gradient-to-br from-[#0a0a23] via-[#1a1a2e] to-[#16213e]">
                {/* Animated background */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2)_0%,transparent_50%)] animate-float"></div>
                
                {/* Header with wallet info */}
                <div className="relative z-10 flex justify-between items-center mb-8 p-6 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                        My Certificates
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="py-3 px-6 bg-white/5 border border-[#7877c6]/30 rounded-xl font-mono text-sm text-[#7877c6]">
                            0x1234...ABCD
                        </div>
                        <button 
                            onClick={changeWallet}
                            className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-[#7877c6] to-[#ff77c6] rounded-xl text-white font-semibold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#7877c6]/40"
                        >
                            <span>🔄</span>
                            Change Wallet
                        </button>
                    </div>
                </div>
                
                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative z-10">
                    <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                            {totalCerts}
                        </div>
                        <div className="text-sm text-white/60 mt-2">Total Certificates</div>
                    </div>
                    <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                            {publicCerts}
                        </div>
                        <div className="text-sm text-white/60 mt-2">Public</div>
                    </div>
                    <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                            {privateCerts}
                        </div>
                        <div className="text-sm text-white/60 mt-2">Private</div>
                    </div>
                    <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                            2.3 ETH
                        </div>
                        <div className="text-sm text-white/60 mt-2">Est. Value</div>
                    </div>
                </div>
                
                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {certificates.map((cert) => (
                        <div 
                            key={cert.id} 
                            className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-lg transition-all hover:translate-y-[-5px] hover:shadow-xl hover:shadow-[#7877c6]/20 hover:border-[#7877c6]/30 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-[#7877c6] before:to-[#ff77c6] before:rounded-t-2xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                                    <p className="text-white/60 text-sm">
                                        Issued: {new Date(cert.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <span 
                                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                        cert.isPublic 
                                            ? "bg-[rgba(34,197,94,0.2)] text-[#22c55e] border border-[#22c55e]/30" 
                                            : "bg-[rgba(239,68,68,0.2)] text-[#ef4444] border border-[#ef4444]/30"
                                    }`}
                                >
                                    {cert.isPublic ? 'Public' : 'Private'}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-white/70">Privacy:</span>
                                    <label className="relative inline-block w-[60px] h-[30px]">
                                        <input 
                                            type="checkbox" 
                                            className="opacity-0 w-0 h-0" 
                                            checked={cert.isPublic}
                                            onChange={() => togglePrivacy(cert.id)}
                                        />
                                        <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all ${
                                            cert.isPublic ? 'bg-gradient-to-r from-[#7877c6] to-[#ff77c6]' : 'bg-white/20'
                                        } border border-white/10 before:content-[''] before:absolute before:h-[22px] before:w-[22px] before:left-1 before:bottom-[3px] before:bg-white before:rounded-full before:transition-all before:shadow-md ${
                                            cert.isPublic ? 'before:translate-x-[30px]' : ''
                                        }`}>
                                        </span>
                                    </label>
                                </div>
                                <button 
                                    className="flex items-center gap-2 py-3 px-6 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all hover:bg-white/15 hover:shadow-lg hover:shadow-white/10"
                                    onClick={() => viewOnIPFS(cert.ipfsHash)}
                                >
                                    <span>🌐</span>
                                    View on IPFS
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Notification popup */}
                {notification && (
                    <div className="fixed top-5 right-5 bg-[#7877c6]/90 text-white py-4 px-6 rounded-xl backdrop-blur-xl border border-white/10 shadow-lg z-50 animate-slideIn">
                        {notification}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
