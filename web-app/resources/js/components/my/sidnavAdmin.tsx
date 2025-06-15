import { useState } from 'react';
import { Link } from '@inertiajs/react';

interface SidebarProps {
  showNotification: (message: string) => void;
  currentPath?: string;
}

const SidnavAdmin = ({ showNotification, currentPath = '' }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return currentPath === path ;
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} h-screen bg-white/[0.08] border-r border-white/10 backdrop-blur-xl fixed left-0 top-0 transition-all duration-300 z-30`}>
     
     <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className={`${!sidebarOpen && 'hidden'} transition-all duration-300`}>
            <h2 className="text-lg font-bold bg-gradient-to-r from-[#7877c6] to-[#ff77c6] bg-clip-text text-transparent">CertVault Admin</h2>
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
              <Link href="/admin/dashboard" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/admin/dashboard') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">📊</span>
                {sidebarOpen && (
                  <span className="ml-3">Dashboard</span>
                )}
                {sidebarOpen && isActive('/admin/dashboard') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/admin/new/companie" 
                className={`flex items-center p-3 text-white rounded-lg transition-colors ${
                  isActive('/admin/new/companie') 
                    ? 'bg-gradient-to-r from-[#7877c6]/20 to-[#ff77c6]/20 border border-white/10' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-xl">🏢</span>
                {sidebarOpen && (
                  <span className="ml-3">Create Company</span>
                )}
                {sidebarOpen && isActive('/admin/new/companie') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-[#7877c6] to-[#ff77c6]"></span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/admin/university/create" 
                className="flex items-center p-3 text-white rounded-lg hover:bg-white/10 group transition-colors"
                onClick={(e) => {e.preventDefault(); showNotification('Create university feature coming soon')}}
              >
                <span className="text-xl">🏛️</span>
                {sidebarOpen && <span className="ml-3">Create University</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/templates" 
                className="flex items-center p-3 text-white rounded-lg hover:bg-white/10 group transition-colors"
                onClick={(e) => {e.preventDefault(); showNotification('Certificate templates feature coming soon')}}
              >
                <span className="text-xl">🔖</span>
                {sidebarOpen && <span className="ml-3">Certificate Templates</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/accounts" 
                className="flex items-center p-3 text-white rounded-lg hover:bg-white/10 group transition-colors"
                onClick={(e) => {e.preventDefault(); showNotification('User accounts management coming soon')}}
              >
                <span className="text-xl">👥</span>
                {sidebarOpen && <span className="ml-3">User Accounts</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/certificates" 
                className="flex items-center p-3 text-white rounded-lg hover:bg-white/10 group transition-colors"
                onClick={(e) => {e.preventDefault(); showNotification('All certificates view coming soon')}}
              >
                <span className="text-xl">🎓</span>
                {sidebarOpen && <span className="ml-3">All Certificates</span>}
              </Link>
            </li>
          </ul>
          
          <div className="pt-8 mt-8 border-t border-white/10">
            <ul className="space-y-2">
              <li>
                <Link href="/admin/settings" 
                  className="flex items-center p-3 text-white rounded-lg hover:bg-white/10 group transition-colors"
                  onClick={(e) => {e.preventDefault(); showNotification('Settings page coming soon')}}
                >
                  <span className="text-xl">⚙️</span>
                  {sidebarOpen && <span className="ml-3">Settings</span>}
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

export default SidnavAdmin;
