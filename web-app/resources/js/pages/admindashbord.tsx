import { useState, useEffect } from 'react';
import { type BreadcrumbItem } from '@/types';
import { Head ,usePage} from '@inertiajs/react';
import SidnavAdmin from '@/components/my/sidnavAdmin';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin',
    },
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

type User = {
    id: number;
    name: string;
    email: string;
    walletAddress: string;
    certificatesCount: number;
    registeredDate: string;
    status: 'active' | 'pending' | 'suspended';
};

type CertificateIssue = {
    id: number;
    title: string;
    issueDate: string;
    issuedTo: string;
    status: 'verified' | 'pending' | 'rejected';
};

const sampleUsers: User[] = [
    {
        id: 1,
        name: "Alex Johnson",
        email: "alex.j@example.com",
        walletAddress: "0x1234...5678",
        certificatesCount: 8,
        registeredDate: "2024-01-15",
        status: 'active'
    },
    {
        id: 2,
        name: "Maria Garcia",
        email: "maria.g@example.com",
        walletAddress: "0x8765...4321",
        certificatesCount: 5,
        registeredDate: "2024-02-10",
        status: 'active'
    },
    {
        id: 3,
        name: "Sam Wilson",
        email: "sam.w@example.com",
        walletAddress: "0xABCD...EF01",
        certificatesCount: 3,
        registeredDate: "2024-02-28",
        status: 'pending'
    },
    {
        id: 4,
        name: "Lina Zhang",
        email: "lina.z@example.com",
        walletAddress: "0x2468...1357",
        certificatesCount: 10,
        registeredDate: "2023-12-05",
        status: 'active'
    },
    {
        id: 5,
        name: "Daniel Park",
        email: "daniel.p@example.com",
        walletAddress: "0x1357...2468",
        certificatesCount: 0,
        registeredDate: "2024-03-01",
        status: 'suspended'
    }
];

const sampleCertIssues: CertificateIssue[] = [
    {
        id: 1,
        title: "Blockchain Developer Level 1",
        issueDate: "2024-03-18",
        issuedTo: "Alex Johnson",
        status: 'verified'
    },
    {
        id: 2,
        title: "Smart Contract Auditor",
        issueDate: "2024-03-17",
        issuedTo: "Maria Garcia",
        status: 'pending'
    },
    {
        id: 3,
        title: "DeFi Specialist",
        issueDate: "2024-03-16",
        issuedTo: "Sam Wilson",
        status: 'rejected'
    },
    {
        id: 4,
        title: "Web3 Frontend Developer",
        issueDate: "2024-03-15",
        issuedTo: "Lina Zhang",
        status: 'verified'
    }
];

export default function Admindashbord() {
    const [users, setUsers] = useState<User[]>(sampleUsers);
    const [certIssues, setCertIssues] = useState<CertificateIssue[]>(sampleCertIssues);
    const [notification, setNotification] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const showNotification = (message: string) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };
    const { url } = usePage();
    const approveUser = (userId: number) => {
        setUsers(prev => 
            prev.map(user => 
                user.id === userId ? { ...user, status: 'active' } : user
            )
        );
        showNotification('User approved successfully');
    };

    const suspendUser = (userId: number) => {
        setUsers(prev => 
            prev.map(user => 
                user.id === userId ? { ...user, status: 'suspended' } : user
            )
        );
        showNotification('User suspended successfully');
    };

    const verifyCertificate = (certId: number) => {
        setCertIssues(prev => 
            prev.map(cert => 
                cert.id === certId ? { ...cert, status: 'verified' } : cert
            )
        );
        showNotification('Certificate verified successfully');
    };

    const rejectCertificate = (certId: number) => {
        setCertIssues(prev => 
            prev.map(cert => 
                cert.id === certId ? { ...cert, status: 'rejected' } : cert
            )
        );
        showNotification('Certificate rejected');
    };

    // Calculate statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const pendingUsers = users.filter(u => u.status === 'pending').length;
    const totalCertificates = users.reduce((acc, user) => acc + user.certificatesCount, 0);
    const pendingCertVerifications = certIssues.filter(c => c.status === 'pending').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#1a1a2e] to-[#16213e] text-white">
            <Head title="Admin Dashboard | CertVault" />
            
            {/* Layout container with sidebar */}
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <SidnavAdmin showNotification={showNotification} currentPath={url} />
                
                {/* Main content with adjusted margin to account for sidebar */}
                <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    {/* Main content container */}
                    <div className="container mx-auto px-4 py-8">
                        {/* Main dashboard content with animated background */}
                        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto relative">
                            {/* Animated background */}
                            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2)_0%,transparent_50%)] animate-float"></div>
                            
                            {/* Header */}
                            <div className="relative z-10 flex justify-between items-center mb-8 p-6 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                                    Admin Dashboard
                                </h1>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => showNotification('System status checked successfully')}
                                        className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-[#7877c6] to-[#ff77c6] rounded-xl text-white font-semibold transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#7877c6]/40"
                                    >
                                        <span>⚡</span>
                                        System Status
                                    </button>
                                </div>
                            </div>
                            
                            {/* Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 relative z-10">
                                <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                                        {totalUsers}
                                    </div>
                                    <div className="text-sm text-white/60 mt-2">Total Users</div>
                                </div>
                                <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                                        {activeUsers}
                                    </div>
                                    <div className="text-sm text-white/60 mt-2">Active Users</div>
                                </div>
                                <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                                        {pendingUsers}
                                    </div>
                                    <div className="text-sm text-white/60 mt-2">Pending Approval</div>
                                </div>
                                <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                                        {totalCertificates}
                                    </div>
                                    <div className="text-sm text-white/60 mt-2">Total Certificates</div>
                                </div>
                                <div className="p-6 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/10 text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                                        {pendingCertVerifications}
                                    </div>
                                    <div className="text-sm text-white/60 mt-2">Pending Verifications</div>
                                </div>
                            </div>
                            
                            {/* Two column layout for user management and certificate issues */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                                {/* Recent Users */}
                                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-white">Recent Users</h2>
                                        <button 
                                            onClick={() => showNotification('User export initiated')}
                                            className="flex items-center gap-2 py-2 px-4 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-semibold transition-all hover:bg-white/15"
                                        >
                                            Export Users
                                        </button>
                                    </div>
                                    
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-white/80">
                                            <thead className="text-xs text-white/60 uppercase">
                                                <tr className="border-b border-white/10">
                                                    <th className="px-4 py-3 text-left">User</th>
                                                    <th className="px-4 py-3 text-left">Wallet</th>
                                                    <th className="px-4 py-3 text-center">Status</th>
                                                    <th className="px-4 py-3 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                                                        <td className="px-4 py-4">
                                                            <div>
                                                                <div className="font-semibold text-white">{user.name}</div>
                                                                <div className="text-xs text-white/50">{user.email}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 font-mono text-xs">{user.walletAddress}</td>
                                                        <td className="px-4 py-4 text-center">
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                                                                user.status === 'active' 
                                                                    ? 'bg-[rgba(34,197,94,0.2)] text-[#22c55e]' 
                                                                    : user.status === 'pending'
                                                                        ? 'bg-[rgba(234,179,8,0.2)] text-[#eab308]'
                                                                        : 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]'
                                                            }`}>
                                                                {user.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {user.status === 'pending' && (
                                                                    <button 
                                                                        onClick={() => approveUser(user.id)}
                                                                        className="p-1.5 bg-[rgba(34,197,94,0.2)] text-[#22c55e] rounded-lg hover:bg-[rgba(34,197,94,0.3)]"
                                                                        title="Approve User"
                                                                    >
                                                                        ✓
                                                                    </button>
                                                                )}
                                                                {user.status !== 'suspended' && (
                                                                    <button 
                                                                        onClick={() => suspendUser(user.id)}
                                                                        className="p-1.5 bg-[rgba(239,68,68,0.2)] text-[#ef4444] rounded-lg hover:bg-[rgba(239,68,68,0.3)]"
                                                                        title="Suspend User"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                )}
                                                                <button 
                                                                    onClick={() => showNotification(`Viewing details for ${user.name}`)}
                                                                    className="p-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20"
                                                                    title="View Details"
                                                                >
                                                                    ⋯
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                {/* Certificate Verification Issues */}
                                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-white">Certificate Verification</h2>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => showNotification('Refreshing certificate data...')}
                                                className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/15"
                                                title="Refresh"
                                            >
                                                🔄
                                            </button>
                                            <select 
                                                className="bg-white/10 border border-white/20 text-white text-sm rounded-lg focus:border-[#7877c6] block p-2"
                                                onChange={() => {}}
                                            >
                                                <option value="all">All Issues</option>
                                                <option value="pending">Pending Only</option>
                                                <option value="verified">Verified Only</option>
                                                <option value="rejected">Rejected Only</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {certIssues.map((issue) => (
                                            <div 
                                                key={issue.id} 
                                                className="p-4 bg-white/[0.05] rounded-xl border border-white/5 hover:border-white/10"
                                            >
                                                <div className="flex justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-white mb-1">{issue.title}</h3>
                                                        <p className="text-xs text-white/50">
                                                            Issued to: {issue.issuedTo} • {new Date(issue.issueDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase h-fit ${
                                                        issue.status === 'verified' 
                                                            ? 'bg-[rgba(34,197,94,0.2)] text-[#22c55e]' 
                                                            : issue.status === 'pending'
                                                                ? 'bg-[rgba(234,179,8,0.2)] text-[#eab308]'
                                                                : 'bg-[rgba(239,68,68,0.2)] text-[#ef4444]'
                                                    }`}>
                                                        {issue.status}
                                                    </span>
                                                </div>
                                                
                                                {issue.status === 'pending' && (
                                                    <div className="flex gap-2 mt-4">
                                                        <button 
                                                            onClick={() => verifyCertificate(issue.id)}
                                                            className="flex-1 py-2 px-4 bg-[rgba(34,197,94,0.2)] text-[#22c55e] rounded-lg hover:bg-[rgba(34,197,94,0.3)] transition-all font-medium text-sm"
                                                        >
                                                            Verify
                                                        </button>
                                                        <button 
                                                            onClick={() => rejectCertificate(issue.id)}
                                                            className="flex-1 py-2 px-4 bg-[rgba(239,68,68,0.2)] text-[#ef4444] rounded-lg hover:bg-[rgba(239,68,68,0.3)] transition-all font-medium text-sm"
                                                        >
                                                            Reject
                                                        </button>
                                                        <button 
                                                            onClick={() => showNotification('Viewing certificate details')}
                                                            className="py-2 px-4 bg-white/10 text-white rounded-lg hover:bg-white/15 transition-all font-medium text-sm"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Activity Log */}
                            <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg mt-6 relative z-10">
                                <h2 className="text-xl font-bold text-white mb-6">System Activity Log</h2>
                                
                                <div className="space-y-2 max-h-60 overflow-y-auto px-2">
                                    <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                        <div className="text-[#22c55e] text-lg">●</div>
                                        <div className="text-white/70">User Maria Garcia verified a new certificate</div>
                                        <div className="ml-auto text-xs text-white/40">2 minutes ago</div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                        <div className="text-[#ef4444] text-lg">●</div>
                                        <div className="text-white/70">Certificate validation failed for ID #8742</div>
                                        <div className="ml-auto text-xs text-white/40">15 minutes ago</div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                        <div className="text-[#eab308] text-lg">●</div>
                                        <div className="text-white/70">New user registration: Daniel Park</div>
                                        <div className="ml-auto text-xs text-white/40">45 minutes ago</div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                        <div className="text-[#22c55e] text-lg">●</div>
                                        <div className="text-white/70">Batch processing completed - 12 certificates issued</div>
                                        <div className="ml-auto text-xs text-white/40">1 hour ago</div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 border-b border-white/5">
                                        <div className="text-[#7877c6] text-lg">●</div>
                                        <div className="text-white/70">System backup completed successfully</div>
                                        <div className="ml-auto text-xs text-white/40">3 hours ago</div>
                                    </div>
                                </div>
                                
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={() => showNotification('Viewing full activity log')}
                                        className="text-sm text-[#7877c6] hover:text-[#ff77c6] transition-colors"
                                    >
                                        View Full Log →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Notification popup */}
            {notification && (
                <div className="fixed top-5 right-5 bg-[#7877c6]/90 text-white py-4 px-6 rounded-xl backdrop-blur-xl border border-white/10 shadow-lg z-50 animate-slideIn">
                    {notification}
                </div>
            )}
            
            {/* Add styles for animations */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-float {
                    animation: float 20s ease-in-out infinite;
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
