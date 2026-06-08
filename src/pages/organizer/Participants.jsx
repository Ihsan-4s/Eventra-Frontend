import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import NavbarDashboard from '../../components/layout/NavbarDashboard'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

const statusColor = {
    confirmed: 'bg-emerald-50 text-emerald-600',
    pending: 'bg-yellow-50 text-yellow-600',
    cancelled: 'bg-red-50 text-red-600',
}

const paymentColor = {
    paid: 'bg-emerald-50 text-emerald-600',
    unpaid: 'bg-yellow-50 text-yellow-600',
    failed: 'bg-red-50 text-red-600',
}

export default function Participants() {
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState('')
    const [registrations, setRegistrations] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get('/organizer/events?per_page=100')
            .then(res => {
                setEvents(res.data.data)
                if (res.data.data.length > 0) setSelectedEvent(res.data.data[0].id)
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        if (!selectedEvent) return
        setLoading(true)
        api.get(`/organizer/events/${selectedEvent}/registrations`)
            .then(res => setRegistrations(res.data.registrations))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [selectedEvent])

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <NavbarDashboard title="Participants" />
                <main className="p-8">

                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-[#0F172A] mb-2">Select Event</label>
                        <select
                            value={selectedEvent}
                            onChange={e => setSelectedEvent(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition min-w-[280px]"
                        >
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="font-['Geist'] text-lg font-bold text-[#0F172A]">Participants</h2>
                            <span className="text-sm text-slate-400">{registrations.length} registered</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#EEF1FF]">
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Reg Code</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
                                    ) : registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center">
                                                <Users size={32} className="mx-auto text-slate-300 mb-2" />
                                                <p className="text-slate-400 text-sm">No participants yet.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        registrations.map(reg => (
                                            <tr key={reg.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-medium text-[#0F172A]">{reg.full_name}</td>
                                                <td className="px-6 py-4 text-slate-600">{reg.email}</td>
                                                <td className="px-6 py-4 text-slate-600">{reg.phone_number}</td>
                                                <td className="px-6 py-4 font-mono text-xs font-bold text-[#6366F1]">{reg.registration_code}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor[reg.status]}`}>
                                                        {reg.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${paymentColor[reg.payment?.payment_status]}`}>
                                                        {reg.payment?.payment_status ?? '-'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}