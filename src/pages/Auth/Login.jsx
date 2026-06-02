import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Grid3X3, Mail, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import Button from '../../components/common/Button'
import bg from '../../assets/bg.jpg'

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await api.post('/login', form)
            const { user, token } = res.data
            login(user, token)
            if (user.role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/organizer/dashboard')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Periksa email dan password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen grid lg:grid-cols-[1.45fr_1fr] bg-[#F8FAFC]">
            <section className="relative hidden lg:flex overflow-hidden px-10 py-10 text-white">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bg}')` }} />
                <div className="absolute inset-0 bg-[#0F172A]/50" />
                <div className="relative z-10 flex min-h-full w-full flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6366F1]">
                            <Grid3X3 size={17} fill="white" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Eventra</h1>
                    </div>
                    <div className="mb-8 max-w-[470px]">
                        <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
                            The world's leading event infrastructure platform.
                        </h2>
                    </div>
                </div>
            </section>

            <section className="flex min-h-screen items-center justify-center px-5 py-10">
                <div className="w-full max-w-[430px]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
                        <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Sign in</h2>
                        <p className="mt-2 text-sm text-[#64748B]">Enter your credentials to access your workspace.</p>

                        {error && (
                            <div className="mt-4 flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="mb-2 block text-xs font-semibold text-[#0F172A]">Work Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="name@company.com"
                                        required
                                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold text-[#0F172A]">Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-12 text-sm outline-none transition focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#0F172A]"
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" disabled={loading} className="w-full rounded-lg">
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#64748B]">
                            New to Eventra?{' '}
                            <Link to="/register" className="font-semibold text-[#6366F1]">Create an account</Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}