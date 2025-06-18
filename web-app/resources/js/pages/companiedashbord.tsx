import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import SidnavCompany from '@/components/my/sidnavCompany';

interface CompanyProps {
  company?: {
    name: string;
    logo?: string;
  };
}

export default function CompanyDashboard({ company }: CompanyProps) {
  const { url } = usePage();
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#1a1a2e] to-[#16213e] text-white">
      <Head title="Company Dashboard | CertVault" />
      
      {/* Layout container with sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SidnavCompany showNotification={showNotification} currentPath={url} companyName={company?.name || 'Company'} />
        
        {/* Main content */}
        <div className="flex-1 overflow-auto ml-64">
          {/* Main content container */}
          <div className="container mx-auto px-4 py-8">
            {/* Content with animated background */}
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 relative">
              {/* Animated background */}
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(120,119,198,0.2)_0%,transparent_50%)] animate-float"></div>
              
              {/* Header */}
              <div className="relative z-10 flex justify-between items-center mb-8 p-6 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">
                  {company?.name || 'Company'} Dashboard
                </h1>
                {company?.logo && (
                  <div className="h-12 w-12 rounded-lg overflow-hidden border border-white/20">
                    <img src={company.logo} alt="Company Logo" className="h-full w-full object-contain" />
                  </div>
                )}
              </div>
              
              {/* Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Quick Stats Cards */}
                <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col">
                  <h3 className="text-lg font-medium text-white/80 mb-2">Total Certificates</h3>
                  <p className="text-3xl font-bold text-white">0</p>
                  <span className="mt-auto text-sm text-white/60">No certificates issued yet</span>
                </div>
                
                <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col">
                  <h3 className="text-lg font-medium text-white/80 mb-2">Certificate Templates</h3>
                  <p className="text-3xl font-bold text-white">0</p>
                  <span className="mt-auto text-sm text-white/60">No templates created yet</span>
                </div>
                
                <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col">
                  <h3 className="text-lg font-medium text-white/80 mb-2">Students</h3>
                  <p className="text-3xl font-bold text-white">0</p>
                  <span className="mt-auto text-sm text-white/60">No students added yet</span>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                
                <div className="flex flex-col items-center justify-center py-12 text-white/60">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-lg">No recent activities</p>
                  <p className="mt-2 text-sm">Create templates and issue certificates to see your activity here</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button 
                    onClick={() => showNotification('Template creation page coming soon')}
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">📝</span>
                    <span className="text-white font-medium">Create Certificate Template</span>
                  </button>
                  
                  <button 
                    onClick={() => showNotification('Certificate issuance page coming soon')}
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">🎓</span>
                    <span className="text-white font-medium">Issue Certificate</span>
                  </button>
                  
                  <button 
                    onClick={() => showNotification('Student management page coming soon')}
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-colors flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">👥</span>
                    <span className="text-white font-medium">Manage Students</span>
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
