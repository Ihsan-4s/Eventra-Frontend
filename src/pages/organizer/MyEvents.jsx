import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, CalendarDays, MapPin, Link2 } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

const statusColor = {
    published: 'bg-emerald-50 text-emerald-600',
    draft: 'bg-yellow-50 text-yellow-600',
    cancelled: 'bg-red-50 text-red-600',
}

export default function MyEvents() {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const fetchEvents = (p = 1) => {
        setLoading(true)
        api.get(`/organizer/events?page=${p}`)
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
            await api.delete(`/organizer/events/${id}`)
            fetchEvents(page)
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menghapus event.')
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <main className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-['Geist'] text-xl font-bold text-[#0F172A]">My Events</h2>
                        <button
                            onClick={() => navigate('/organizer/events/create')}
                            className="flex items-center gap-2 bg-[#6366F1] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4F46E5] transition"
                        >
                            <Plus size={16} />
                            Create Event
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
                                    <div className="h-36 rounded-xl bg-slate-100 mb-4" />
                                    <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : events.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                            <CalendarDays size={40} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-400 text-sm">No events yet.</p>
                            <button
                                onClick={() => navigate('/organizer/events/create')}
                                className="mt-4 inline-flex items-center gap-2 bg-[#6366F1] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4F46E5] transition"
                            >
                                <Plus size={16} />
                                Create your first event
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                {events.map(event => (
                                    <div key={event.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition">
                                        {/* Banner */}
                                        <div className="h-36 bg-[#EEF1FF] flex items-center justify-center overflow-hidden">
                                            {event.banner ? (
                                                <img
                                                    src={`http://localhost:8000/storage/${event.banner}`}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <CalendarDays size={32} className="text-[#6366F1]/40" />
                                            )}
                                        </div>

                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="font-['Geist'] font-bold text-[#0F172A] text-sm leading-snug line-clamp-2">
                                                    {event.title}
                                                </h3>
                                                <span className={`shrink-0 inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[event.status]}`}>
                                                    {event.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1.5 mb-4">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <CalendarDays size={12} />
                                                    {new Date(event.event_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                    <MapPin size={12} />
                                                    {event.location}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-[#6366F1]">
                                                    Rp {Number(event.price).toLocaleString('id-ID')}
                                                </span>
                                                <div className="flex gap-2">
                                                    {event.status === 'published' && (
                                                        <button
                                                            onClick={() => {
                                                                navigator.clipboard.writeText(`${window.location.origin}/events/${event.slug}`)
                                                                alert('Link copied!')
                                                            }}
                                                            className="p-2 rounded-lg bg-emerald-50 text-emerald-500 hover:bg-emerald-100 transition"
                                                            title="Copy event link"
                                                        >
                                                            <Link2 size={14} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
                                                        className="p-2 rounded-lg bg-[#EEF1FF] text-[#6366F1] hover:bg-indigo-100 transition"
                                                    >
                                                        <Pencil size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(event.id)}
                                                        className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {lastPage > 1 && (
                                <div className="flex items-center justify-between mt-6">
                                    <button
                                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                                        disabled={page === 1}
                                        className="text-sm px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-slate-500">Page {page} of {lastPage}</span>
                                    <button
                                        onClick={() => setPage(p => Math.min(p + 1, lastPage))}
                                        disabled={page === lastPage}
                                        className="text-sm px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    )
}