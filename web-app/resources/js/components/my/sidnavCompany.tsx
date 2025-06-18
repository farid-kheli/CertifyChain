import { useState } from 'react';
import { Link } from '@inertiajs/react';

interface SidebarProps {
  showNotification: (message: string) => void;
  currentPath?: string;
  companyName: string;
}

const SidnavCompany = ({ showNotification, currentPath = '', companyName }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} h-screen bg-white/[0.08] border-r border-white/10 backdrop-blur-xl fixed left-0 top-0 transition-all duration-300 z-30`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className={`${!sidebarOpen && 'hidden'} transition-all duration-300`}>
            <h2 className="text-lg font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">{companyName}</h2>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            <li>
              <Link href="/company/dashboard" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/company/dashboard') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">📊</span>
                {sidebarOpen && (
                  <span className="ml-3">Dashboard</span>
                )}
                {sidebarOpen && isActive('/company/dashboard') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            
            {/* Certificate Templates */}
            <li>
              <Link href="/company/templates" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/company/templates') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">📝</span>
                {sidebarOpen && (
                  <span className="ml-3">Certificate Templates</span>
                )}
                {sidebarOpen && isActive('/company/templates') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            
            {/* Create Template */}
            <li>
              <Link href="/company/templates/new" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/company/templates/new') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">➕</span>
                {sidebarOpen && (
                  <span className="ml-3">Create Template</span>
                )}
                {sidebarOpen && isActive('/company/templates/new') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            
            {/* Issue Certificate */}
            <li>
              <Link href="/issuecert" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/issuecert') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">🎓</span>
                {sidebarOpen && (
                  <span className="ml-3">Issue Certificate</span>
                )}
                {sidebarOpen && isActive('/issuecert') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            
            {/* All Certificates */}
            <li>
              <Link href="/company/certificates" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/company/certificates') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">📜</span>
                {sidebarOpen && (
                  <span className="ml-3">All Certificates</span>
                )}
                {sidebarOpen && isActive('/company/certificates') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            
            {/* Student Management */}
            <li>
              <Link href="/company/students" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/company/students') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">👥</span>
                {sidebarOpen && (
                  <span className="ml-3">Manage Students</span>
                )}
                {sidebarOpen && isActive('/company/students') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
          </ul>
          
          <div className="pt-8 mt-8 border-t border-white/10">
            <ul className="space-y-2">
              <li>
                <Link href="/company/profile" 
                  className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                    isActive('/company/profile') 
                      ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">⚙️</span>
                  {sidebarOpen && (
                    <span className="ml-3">Company Profile</span>
                  )}
                  {sidebarOpen && isActive('/company/profile') && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                  )}
                </Link>
              </li>
              <li>
                <Link href="/logout" 
                  className="flex items-center p-3 text-white rounded-lg hover:bg-white/10 group transition-colors"
                  onClick={(e) => {e.preventDefault(); showNotification('Logging out...')}}
                >
                  <span className="text-xl">🚪</span>
                  {sidebarOpen && <span className="ml-3">Logout</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidnavCompany;
