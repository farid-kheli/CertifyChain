import { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import SidnavAdmin from '@/components/my/sidnavAdmin';

type CompanyData = {
  name: string;
  description: string;
  website: string;
  address: string;
  industry: string;
  email: string;
  password: string;
  logoFile: File | null;
};

export default function NewCompany() {
  const { url } = usePage();
  const [notification, setNotification] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use Inertia's useForm hook to handle form submission
  const { data, setData, post, processing, errors: formErrors } = useForm<CompanyData>({
    name: '',
    description: '',
    website: '',
    address: '',
    industry: 'technology',
    email: '',
    password: '',
    logoFile: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CompanyData, string>>>({});

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(name as keyof CompanyData, value);

    // Clear error when field is edited
    if (errors[name as keyof CompanyData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('logoFile', file);

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyData, string>> = {};

    if (!data.name.trim()) newErrors.name = 'Company name is required';
    if (!data.description.trim()) newErrors.description = 'Company description is required';
    if (!data.website.trim()) newErrors.website = 'Website is required';
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Submit the form using Inertia.js with proper file handling
    post(route('create.companie'), {
      onSuccess: () => {
        showNotification('Company created successfully!');
        setIsSubmitting(false);
        // Reset form
        setData({
          name: '',
          description: '',
          website: '',
          address: '',
          industry: 'technology',
          email: '',
          password: '',
          logoFile: null,
        });
        setPreviewImage(null);
      },
      onError: (errors) => {
        setIsSubmitting(false);
        showNotification('Error creating company. Please check the form.');
        setErrors(errors);
      },
      // Setting the necessary options for file uploads
      forceFormData: true,  // Force using FormData
      preserveState: false, // Don't preserve the form state after submission
      preserveScroll: true  // Maintain scroll position
    });
  };

  const industries = [
    'technology', 'finance', 'healthcare', 'education', 'retail',
    'manufacturing', 'entertainment', 'transportation', 'construction', 'other'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#1a1a2e] to-[#16213e] text-white">
      <Head title="Create New Company | CertVault" />

      {/* Layout container with sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <SidnavAdmin showNotification={showNotification} currentPath={url} />

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
                  Create New Company
                </h1>
              </div>

              {/* Company Creation Form */}
              <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-white">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.name || formErrors.name ? 'border-red-500' : 'border-white/20'
                          } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]`}
                        placeholder="Enter company name"
                      />
                      {(errors.name || formErrors.name) && (
                        <p className="mt-1 text-sm text-red-400">{errors.name || formErrors.name}</p>
                      )}
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <label htmlFor="industry" className="block text-sm font-medium text-white">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={data.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#7877c6] capitalize"
                      >
                        {industries.map(industry => (
                          <option key={industry} value={industry} className="bg-[#1a1a2e] capitalize">
                            {industry.charAt(0).toUpperCase() + industry.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Website */}
                    <div className="space-y-2">
                      <label htmlFor="website" className="block text-sm font-medium text-white">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={data.website}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.website ? 'border-red-500' : 'border-white/20'
                          } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]`}
                        placeholder="https://example.com"
                      />
                      {errors.website && <p className="mt-1 text-sm text-red-400">{errors.website}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6] font-mono"
                        placeholder="Enter password"
                      />
                    </div>

                    {/* Contact Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-white">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.email || formErrors.email ? 'border-red-500' : 'border-white/20'
                          } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]`}
                        placeholder="contact@company.com"
                      />
                      {(errors.email || formErrors.email) && (
                        <p className="mt-1 text-sm text-red-400">{errors.email || formErrors.email}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-white">
                        Company Address (Optional)
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6]"
                        placeholder="123 Business St, City, Country"
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-white">
                        Company Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.description ? 'border-red-500' : 'border-white/20'
                          } text-white placeholder-white/50 focus:outline-none focus:border-[#7877c6] resize-none`}
                        placeholder="Brief description of the company"
                      />
                      {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="logoFile" className="block text-sm font-medium text-white">
                        Company Logo (Optional)
                      </label>

                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex justify-center items-center w-full">
                            <label htmlFor="logoFile" className="flex flex-col justify-center items-center w-full h-32 bg-white/10 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5">
                              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                <svg className="w-8 h-8 text-white/60 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-white/60 text-center">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-white/50">SVG, PNG, or JPG (MAX. 2MB)</p>
                              </div>
                              <input
                                id="logoFile"
                                name="logo"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        {previewImage && (
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-lg overflow-hidden">
                              <img src={previewImage} alt="Logo preview" className="w-full h-full object-contain" />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewImage(null);
                                setData('logoFile', null);
                              }}
                              className="mt-2 text-xs text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
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
                      disabled={isSubmitting || processing}
                      className={`px-6 py-3 rounded-xl bg-gradient-to-r from-[#7877c6] to-[#ff77c6] text-white font-semibold transition-all hover:shadow-lg hover:shadow-[#7877c6]/40 ${(isSubmitting || processing) ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                      {(isSubmitting || processing) ? 'Creating...' : 'Create Company'}
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
