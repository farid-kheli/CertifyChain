import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="container py-5">
            <div className="row" style={{ justifyContent: 'center', display: 'flex' }}>
                <div className="col" style={{ maxWidth: '450px' }}>
                    <Head title="Register" />
                    
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-2">Create an account</h2>
                            <p className="text-center mb-4" style={{ color: '#64748b' }}>Enter your details below to create your account</p>
                            
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="mb-1" style={{ display: 'block', fontWeight: 500 }}>
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="px-3 py-2"
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                        }}
                                        value={data.name}
                                        autoFocus
                                        autoComplete="name"
                                        placeholder="Full name"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        disabled={processing}
                                    />
                                    {errors.name && <div className="mt-1" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{errors.name}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="email" className="mb-1" style={{ display: 'block', fontWeight: 500 }}>
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="px-3 py-2"
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                        }}
                                        value={data.email}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        disabled={processing}
                                    />
                                    {errors.email && <div className="mt-1" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{errors.email}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="mb-1" style={{ display: 'block', fontWeight: 500 }}>
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="px-3 py-2"
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                        }}
                                        value={data.password}
                                        autoComplete="new-password"
                                        placeholder="Password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                        disabled={processing}
                                    />
                                    {errors.password && <div className="mt-1" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{errors.password}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="password_confirmation" className="mb-1" style={{ display: 'block', fontWeight: 500 }}>
                                        Confirm Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        className="px-3 py-2"
                                        style={{
                                            width: '100%',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                        }}
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                        disabled={processing}
                                    />
                                    {errors.password_confirmation && <div className="mt-1" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{errors.password_confirmation}</div>}
                                </div>
                                
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" style={{ marginRight: '0.5rem' }} />}
                                    Create account
                                </button>
                            </form>
                            
                            <div className="text-center mt-4">
                                <p style={{ color: '#64748b' }}>
                                    Already have an account?{' '}
                                    <a href={route('login')} style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>
                                        Log in
                                    </a>
                                </p>
                            </div>
                            
                            <div className="mt-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <hr style={{ flex: 1, border: 'none', height: '1px', background: '#e2e8f0' }} />
                                <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Or continue with</span>
                                <hr style={{ flex: 1, border: 'none', height: '1px', background: '#e2e8f0' }} />
                            </div>
                            
                            <div className="mt-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }}>
                                    <i className="fab fa-google"></i> Google
                                </button>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }}>
                                    <i className="fab fa-github"></i> GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
