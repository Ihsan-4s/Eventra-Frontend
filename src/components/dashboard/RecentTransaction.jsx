import { useEffect, useState } from 'react'
import { CalendarDays, MapPin } from 'lucide-react'
import api from '../../api/axios'

export default function RecentTransactions() {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/organizer/events')
            .then(res => setEvents(res.data.data.slice(0, 5)))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-[var(--secondary)]">My Events</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#EEF1FF]">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Event</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Location</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Loading...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No events yet.</td></tr>
                        ) : (
                            events.map(event => (
                                <tr>
                                    <td className="px-6 py-4 font-medium text-[#0F172A] max-w-[200px] truncate">{event.title}</td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-1.5">
                                            <CalendarDays size={13} className="text-slate-400" />
                                            {new Date(event.event_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={13} className="text-slate-400" />
                                            {event.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#0F172A]">
                                        Rp {Number(event.price).toLocaleString('id-ID')}
                                    </td>
                                    
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}