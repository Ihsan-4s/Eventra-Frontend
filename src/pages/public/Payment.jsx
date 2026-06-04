import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CalendarDays, MapPin, CheckCircle2 } from 'lucide-react'
import api from '../../api/axios'

export default function Payment() {
    const { transactionId } = useParams()
    const navigate = useNavigate()
    const [payment, setPayment] = useState(null)
    const [loading, setLoading] = useState(true)
    const [paying, setPaying] = useState(false)

    useEffect(() => {
        api.get(`/payments/${transactionId}`)
            .then(res => setPayment(res.data.payment))
            .catch(() => navigate('/'))
            .finally(() => setLoading(false))
    }, [transactionId])

    const handleSimulatePay = async () => {
        setPaying(true)
        try {
            const res = await api.post(`/payments/${transactionId}/simulate-pay`)
            const ticketCode = res.data.ticket?.ticket_code
            localStorage.setItem('last_transaction_id', transactionId) // tambahin ini
            navigate(`/ticket/${ticketCode}`)
        } catch (err) {
            alert(err.response?.data?.message || 'Pembayaran gagal.')
        } finally {
            setPaying(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-[#F4F6FF] flex items-center justify-center">
            <div className="w-9 h-9 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (!payment) return null

    const { registration } = payment
    const { event } = registration

    return (
        <div className="min-h-screen bg-[#F4F6FF] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md space-y-4">

                <div className="text-center">
                    <h1 className="font-['Geist'] text-2xl font-bold text-[#0F172A]">Complete Payment</h1>
                    <p className="text-sm text-slate-500 mt-1">Scan QRIS below to complete your registration</p>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 className="font-['Geist'] font-bold text-[#0F172A] mb-4">Order Summary</h2>

                    <div className="flex items-start gap-3 mb-5 pb-5 border-b border-slate-100">
                        <div className="w-12 h-12 rounded-xl bg-[#EEF1FF] flex items-center justify-center shrink-0">
                            <CalendarDays size={20} className="text-[#6366F1]" />
                        </div>
                        <div>
                            <p className="font-semibold text-[#0F172A] text-sm">{event.title}</p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                                <MapPin size={11} />
                                {event.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                                <CalendarDays size={11} />
                                {new Date(event.event_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Name</span>
                            <span className="font-medium text-[#0F172A]">{registration.full_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Email</span>
                            <span className="font-medium text-[#0F172A]">{registration.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Registration Code</span>
                            <span className="font-mono font-bold text-[#6366F1]">{registration.registration_code}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-slate-100 mt-3">
                            <span className="font-bold text-[#0F172A]">Total</span>
                            <span className="font-bold text-[#6366F1] text-lg">
                                Rp {Number(payment.amount).toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* QRIS */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Scan QRIS</p>

                    {/* QRIS Placeholder */}
                    <div className="w-48 h-48 mx-auto bg-[#F8FAFC] border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center mb-4">
                        <div className="text-center">
                            <div className="grid grid-cols-3 gap-1 mb-2">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className={`w-4 h-4 rounded-sm ${i % 2 === 0 ? 'bg-[#0F172A]' : 'bg-slate-200'}`} />
                                ))}
                            </div>
                            <p className="text-xs text-slate-400">QRIS</p>
                        </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-1">Transaction ID</p>
                    <p className="font-mono text-sm font-bold text-[#0F172A]">{payment.transaction_id}</p>
                </div>

                {/* Simulate Pay Button */}
                {payment.payment_status === 'unpaid' ? (
                    <button
                        onClick={handleSimulatePay}
                        disabled={paying}
                        className="w-full bg-[#6366F1] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#4F46E5] transition disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        {paying ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            '✓ Simulate Payment'
                        )}
                    </button>
                ) : (
                    <div className="flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 py-4 rounded-2xl font-bold text-sm">
                        <CheckCircle2 size={18} />
                        Payment Completed
                    </div>
                )}

            </div>
        </div>
    )
}