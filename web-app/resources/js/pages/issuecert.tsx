import { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import SidnavCompany from '@/components/my/sidnavCompany';

type CertificateData = {
  studentName: string;
  studentEmail: string;
  certificateCode: string;
  issueDate: string;
  expiryDate: string;
  additionalInfo: string;
  templateId: string;
};

interface Props {
  company?: {
    name: string;
    logo?: string;
  };
  templates?: Array<{
    id: string;
    name: string;
    description?: string;
  }>;
}

export default function IssueCertificate({ company, templates = [{id: "1" ,name : "hello",description :  "erer"}] }: Props) {
  const { url } = usePage();  
  const [notification, setNotification] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data, setData, post, processing, errors: formErrors } = useForm<CertificateData>({
    studentName: '',
    studentEmail: '',
    certificateCode: '',
    issueDate: new Date().toISOString().split('T')[0], // Today's date as default
    expiryDate: '',
    additionalInfo: '',
    templateId: templates.length > 0 ? templates[0].id : '',
  });

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(name as keyof CertificateData, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    post(route('certificates.issue'), {
      onSuccess: () => {
        showNotification('Certificate issued successfully!');
        setIsSubmitting(false);
      },
      onError: () => {
        setIsSubmitting(false);
        showNotification('Failed to issue certificate. Please check the form.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#1a1a2e] to-[#16213e] text-white">
      <Head title="Issue Certificate | CertVault" />
      
      {/* Layout container with sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SidnavCompany 
          showNotification={showNotification} 
          currentPath={url} 
          companyName={company?.name || 'Company'}
        />
        
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
                  Issue New Certificate
                </h1>
                {company?.logo && (
                  <div className="h-12 w-12 rounded-lg overflow-hidden border border-white/20">
                    <img src={company.logo} alt="Company Logo" className="h-full w-full object-contain" />
                  </div>
                )}
              </div>
              
              {/* Certificate Issuance Form */}
              <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Template Selection */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="templateId" className="block text-sm font-medium text-white">
                        Certificate Template
                      </label>
                      <select
                        id="templateId"
                        name="templateId"
                        value={data.templateId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#7877c6]"
                      >
                        {templates.length > 0 ? (
                          templates.map(template => (
                            <option key={template.id} value={template.id} className="bg-[#1a1a2e]">
                              {template.name}
                            </option>
                          ))
                        ) : (
                          <option value="" className="bg-[#1a1a2e]">No templates available</option>
                        )}
                      </select>
                      {templates.length === 0 && (
                        <p className="mt-1 text-sm text-yellow-400">
                          Please create a certificate template first
                        </p>
                      )}
                    </div>
                    
                    {/* Student Name */}
                    <div className="space-y-2">
                      <label htmlFor="studentName" className="block text-sm font-medium text-white">
                        Student Name
                      </label>
                      <input
                        type="text"
                        id="studentName"
                        name="studentName"
                        value={data.studentName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                          formErrors.studentName ? 'border-red-500' : 'border-white/20'
                        } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]`}
                        placeholder="Enter student's full name"
                      />
                      {formErrors.studentName && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.studentName}</p>
                      )}
                    </div>
                    
                    {/* Student Email */}
                    <div className="space-y-2">
                      <label htmlFor="studentEmail" className="block text-sm font-medium text-white">
                        Student Email
                      </label>
                      <input
                        type="email"
                        id="studentEmail"
                        name="studentEmail"
                        value={data.studentEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                          formErrors.studentEmail ? 'border-red-500' : 'border-white/20'
                        } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]`}
                        placeholder="student@example.com"
                      />
                      {formErrors.studentEmail && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.studentEmail}</p>
                      )}
                    </div>
                    
                    {/* Certificate Code */}
                    <div className="space-y-2">
                      <label htmlFor="certificateCode" className="block text-sm font-medium text-white">
                        Certificate Code/ID
                      </label>
                      <input
                        type="text"
                        id="certificateCode"
                        name="certificateCode"
                        value={data.certificateCode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                          formErrors.certificateCode ? 'border-red-500' : 'border-white/20'
                        } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]`}
                        placeholder="CERT-12345"
                      />
                      {formErrors.certificateCode && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.certificateCode}</p>
                      )}
                    </div>
                    
                    {/* Issue Date */}
                    <div className="space-y-2">
                      <label htmlFor="issueDate" className="block text-sm font-medium text-white">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={data.issueDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#7877c6]"
                      />
                    </div>
                    
                    {/* Expiry Date (Optional) */}
                    <div className="space-y-2">
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-white">
                        Expiry Date (Optional)
                      </label>
                      <input
                        type="date"
                        id="expiryDate"
                        name="expiryDate"
                        value={data.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#7877c6]"
                      />
                    </div>
                    
                    {/* Additional Information */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-white">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={data.additionalInfo}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6] resize-none"
                        placeholder="Enter any additional details about this certificate"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || processing || templates.length === 0}
                      className={`px-6 py-3 rounded-xl bg-gradient-to-r from-[#7877c6] to-[#ff77c6] text-white font-semibold transition-all hover:shadow-lg hover:shadow-[#7877c6]/40 ${
                        (isSubmitting || processing || templates.length === 0) ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Issuing...' : 'Issue Certificate'}
                    </button>
                  </div>
                </form>
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
