import { useEffect, useState } from 'react'
import { Trash2, Eye } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import NavbarDashboard from '../../components/layout/NavbarDashboard'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

export default function AdminEvents() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const fetchEvents = (p = 1) => {
        setLoading(true)
        api.get(`/admin/events?page=${p}`)
            .then(res => {
                setEvents(res.data.data)
                setLastPage(res.data.last_page)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchEvents(page) }, [page])

    const handleDelete = async (id) => {
        if (!confirm('Hapus event ini?')) return
        try {
            await api.delete(`/admin/events/${id}`)
            fetchEvents(page)
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menghapus event.')
        }
    }

    const statusColor = {
        published: 'bg-emerald-50 text-emerald-600',
        draft: 'bg-yellow-50 text-yellow-600',
        cancelled: 'bg-red-50 text-red-600',
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <NavbarDashboard title="Events" />
                <main className="p-8">
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="font-['Geist'] text-lg font-bold text-[#0F172A]">All Events</h2>
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
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
                                    ) : events.length === 0 ? (
                                        <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">No events found.</td></tr>
                                    ) : (
                                        events.map(event => (
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
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleDelete(event.id)}
                                                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                                                        <Trash2 size={15} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {lastPage > 1 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
                                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}
                                    className="text-sm px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition">
                                    Previous
                                </button>
                                <span className="text-sm text-slate-500">Page {page} of {lastPage}</span>
                                <button onClick={() => setPage(p => Math.min(p + 1, lastPage))} disabled={page === lastPage}
                                    className="text-sm px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition">
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}