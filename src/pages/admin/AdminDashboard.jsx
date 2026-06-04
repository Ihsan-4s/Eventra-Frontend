import { useEffect, useState } from 'react'
import { Users, CalendarDays, DollarSign, Ticket } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import NavbarDashboard from '../../components/layout/NavbarDashboard'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

const cards = [
    { key: 'total_organizers', label: 'Total Organizers', icon: Users, color: 'text-[#6366F1] bg-[#EEF1FF]' },
    { key: 'total_events', label: 'Total Events', icon: CalendarDays, color: 'text-orange-500 bg-orange-50' },
    { key: 'total_revenue', label: 'Total Revenue', icon: DollarSign, color: 'text-emerald-500 bg-emerald-50', isCurrency: true },
    { key: 'total_tickets', label: 'Total Tickets', icon: Ticket, color: 'text-rose-500 bg-rose-50' },
]

const statusColor = {
    published: 'bg-emerald-50 text-emerald-600',
    draft: 'bg-yellow-50 text-yellow-600',
    cancelled: 'bg-red-50 text-red-600',
}

export default function AdminDashboard() {
    const [summary, setSummary] = useState(null)
    const [recentEvents, setRecentEvents] = useState([])
    const [loadingSummary, setLoadingSummary] = useState(true)
    const [loadingEvents, setLoadingEvents] = useState(true)

    useEffect(() => {
        api.get('/admin/dashboard')
            .then(res => setSummary(res.data.summary))
            .catch(err => console.error(err))
            .finally(() => setLoadingSummary(false))

        api.get('/admin/events?page=1')
            .then(res => setRecentEvents(res.data.data.slice(0, 5)))
            .catch(err => console.error(err))
            .finally(() => setLoadingEvents(false))
    }, [])

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <NavbarDashboard title="Dashboard" />
                <main className="p-8">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                        {cards.map(({ key, label, icon: Icon, color, isCurrency }) => (
                            <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-sm text-slate-500">{label}</span>
                                </div>
                                <p className="text-2xl font-bold text-[#0F172A] font-['Geist']">
                                    {loadingSummary ? (
                                        <span className="inline-block w-16 h-6 bg-slate-100 animate-pulse rounded" />
                                    ) : isCurrency ? (
                                        `Rp ${Number(summary?.[key] || 0).toLocaleString('id-ID')}`
                                    ) : (
                                        summary?.[key] ?? 0
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Recent Events */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="font-['Geist'] text-lg font-bold text-[#0F172A]">Recent Events</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#EEF1FF]">
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Event</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Organizer</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadingEvents ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
                                    ) : recentEvents.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No events yet.</td></tr>
                                    ) : (
                                        recentEvents.map(event => (
                                            <tr key={event.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                                                <td className="px-6 py-4 font-medium text-[#0F172A] max-w-[200px] truncate">{event.title}</td>
                                                <td className="px-6 py-4 text-slate-600">{event.user?.name ?? '-'}</td>
                                                <td className="px-6 py-4 text-slate-600">{event.category?.name ?? '-'}</td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    {new Date(event.event_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColor[event.status]}`}>
                                                        {event.status}
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