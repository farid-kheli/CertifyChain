import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="container py-5">
            <div className="row" style={{ justifyContent: 'center', display: 'flex' }}>
                <div className="col" style={{ maxWidth: '450px' }}>
                    <Head title="Log in" />
                    
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Log in to your account</h2>
                            <p className="text-center mb-4" style={{ color: '#64748b' }}>Enter your email and password below to log in</p>
                            
                            <form onSubmit={submit}>
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
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {errors.email && <div className="mt-1" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{errors.email}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <label htmlFor="password" className="mb-1" style={{ fontWeight: 500 }}>
                                            Password
                                        </label>
                                        {canResetPassword && (
                                            <a href={route('password.request')} style={{ fontSize: '0.875rem', color: '#667eea', textDecoration: 'none' }}>
                                                Forgot password?
                                            </a>
                                        )}
                                    </div>
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
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {errors.password && <div className="mt-1" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{errors.password}</div>}
                                </div>
                                
                                <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={data.remember}
                                        onChange={() => setData('remember', !data.remember)}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    <label htmlFor="remember" style={{ margin: 0 }}>Remember me</label>
                                </div>
                                
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" style={{ marginRight: '0.5rem' }} />}
                                    Log in
                                </button>
                            </form>
                            
                            <div className="text-center mt-4">
                                <p style={{ color: '#64748b' }}>
                                    Don't have an account?{' '}
                                    <a href={route('register')} style={{ color: '#667eea', textDecoration: 'none', fontWeight: 500 }}>
                                        Sign up
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
                            
                            {status && <div className="mt-4 text-center" style={{ color: '#2f855a', fontSize: '0.875rem' }}>{status}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
