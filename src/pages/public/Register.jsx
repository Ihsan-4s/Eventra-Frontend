import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { User, Mail, Phone } from 'lucide-react'
import api from '../../api/axios'

export default function EventRegister() {
    const { slug } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({ full_name: '', email: '', phone_number: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: null })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})
        try {
            const res = await api.post(`/events/${slug}/register`, form)
            const transactionId = res.data.payment.transaction_id
            navigate(`/payment/${transactionId}`)
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                alert(err.response?.data?.message || 'Registrasi gagal.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F4F6FF] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="font-['Geist'] text-2xl font-bold text-[#0F172A]">Register for Event</h1>
                    <p className="text-sm text-slate-500 mt-2">Fill in your details to secure your spot</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Full Name</label>
                            <div className="relative">
                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    name="full_name"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                />
                            </div>
                            {errors.full_name && <p className="text-xs text-red-500 mt-1">{errors.full_name[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                />
                            </div>
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Phone Number</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    placeholder="08xxxxxxxxxx"
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                />
                            </div>
                            {errors.phone_number && <p className="text-xs text-red-500 mt-1">{errors.phone_number[0]}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#6366F1] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#4F46E5] transition disabled:opacity-60"
                        >
                            {loading ? 'Processing...' : 'Continue to Payment'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}