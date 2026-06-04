import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CalendarDays, MapPin, User, Mail, Phone, Download, CheckCircle2 } from 'lucide-react'
import api from '../../api/axios'

export default function Ticket() {
    const { ticketCode } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Ambil dari localStorage transaction_id yang disimpan pas simulate-pay
        const transactionId = localStorage.getItem('last_transaction_id')
        if (!transactionId) {
            navigate('/')
            return
        }
        api.get(`/payments/${transactionId}`)
            .then(res => setData(res.data.payment))
            .catch(() => navigate('/'))
            .finally(() => setLoading(false))
    }, [ticketCode])

    if (loading) return (
        <div className="min-h-screen bg-[#F4F6FF] flex items-center justify-center">
            <div className="w-9 h-9 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
        </div>
    )

    if (!data) return null

    const { registration } = data
    const { event } = registration

    return (
        <div className="min-h-screen bg-[#F4F6FF] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md space-y-4">

                {/* Success Banner */}
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-emerald-500" />
                    </div>
                    <h1 className="font-['Geist'] text-2xl font-bold text-[#0F172A]">Payment Successful!</h1>
                    <p className="text-sm text-slate-500 mt-1">Your ticket has been generated</p>
                </div>

                {/* Ticket Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    {/* Header */}
                    <div className="bg-[#6366F1] p-6 text-white">
                        <p className="text-xs font-semibold text-indigo-200 uppercase tracking-wider mb-1">
                            {event.organization_name}
                        </p>
                        <h2 className="font-['Geist'] text-xl font-bold leading-tight">{event.title}</h2>
                        <div className="flex flex-wrap gap-3 mt-4 text-sm text-indigo-100">
                            <div className="flex items-center gap-1.5">
                                <CalendarDays size={13} />
                                {new Date(event.event_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={13} />
                                {event.location}
                            </div>
                        </div>
                    </div>

                    {/* Dashed divider */}
                    <div className="flex items-center px-6">
                        <div className="w-5 h-5 rounded-full bg-[#F4F6FF] -ml-8 shrink-0" />
                        <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2" />
                        <div className="w-5 h-5 rounded-full bg-[#F4F6FF] -mr-8 shrink-0" />
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">

                        {/* Participant Info */}
                        <div className="space-y-3">
                            {[
                                { icon: User, label: 'Name', value: registration.full_name },
                                { icon: Mail, label: 'Email', value: registration.email },
                                { icon: Phone, label: 'Phone', value: registration.phone_number },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-3 text-sm">
                                    <Icon size={14} className="text-slate-400 shrink-0" />
                                    <span className="text-slate-400 w-16 shrink-0">{label}</span>
                                    <span className="font-medium text-[#0F172A]">{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Registration Code</span>
                                <span className="font-mono font-bold text-[#6366F1]">{registration.registration_code}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Ticket Code</span>
                                <span className="font-mono font-bold text-[#0F172A]">{ticketCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Amount Paid</span>
                                <span className="font-bold text-emerald-600">
                                    Rp {Number(data.amount).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex flex-col items-center pt-2">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${ticketCode}`}
                                alt="QR Code"
                                className="w-40 h-40 rounded-xl border border-slate-100"
                            />
                            <p className="text-xs text-slate-400 mt-2">Scan this QR at the event</p>
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                <a
                    href={`http://localhost:8000/api/organizer/events/${event.id}/export/registrations/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#0F172A] text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition"
                >
                    <Download size={16} />
                    Download Ticket PDF
                </a>
            </div>
        </div>
    )
}