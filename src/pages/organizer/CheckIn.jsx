import { useState, useEffect } from 'react'
import { ScanLine, CheckCircle2, XCircle } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

export default function CheckIn() {
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState('')
    const [ticketCode, setTicketCode] = useState('')
    const [result, setResult] = useState(null) // { success, message, name, time }
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        api.get('/organizer/events?per_page=100')
            .then(res => {
                setEvents(res.data.data)
                if (res.data.data.length > 0) setSelectedEvent(res.data.data[0].id)
            })
            .catch(err => console.error(err))
    }, [])

    const handleCheckIn = async (e) => {
        e.preventDefault()
        if (!ticketCode.trim()) return
        setLoading(true)
        setResult(null)
        try {
            const res = await api.post(`/organizer/events/${selectedEvent}/check-in`, {
                ticket_code: ticketCode
            })
            setResult({
                success: true,
                message: res.data.message,
                name: res.data.full_name,
                time: res.data.check_in_time,
            })
            setTicketCode('')
        } catch (err) {
            setResult({
                success: false,
                message: err.response?.data?.message || 'Check-in gagal.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <main className="p-8">
                    <div className="max-w-lg mx-auto">

                        {/* Event Selector */}
                        <div className="mb-6">
                            <label className="block text-xs font-semibold text-[#0F172A] mb-2">Select Event</label>
                            <select
                                value={selectedEvent}
                                onChange={e => { setSelectedEvent(e.target.value); setResult(null) }}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition w-full"
                            >
                                {events.map(event => (
                                    <option key={event.id} value={event.id}>{event.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* Check-in Form */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#EEF1FF] mx-auto mb-6">
                                <ScanLine size={28} className="text-[#6366F1]" />
                            </div>

                            <h2 className="font-['Geist'] text-xl font-bold text-[#0F172A] text-center mb-2">
                                Scan Ticket
                            </h2>
                            <p className="text-sm text-slate-400 text-center mb-8">
                                Enter or scan the ticket code to check-in participant
                            </p>

                            <form onSubmit={handleCheckIn} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                                        Ticket Code
                                    </label>
                                    <input
                                        type="text"
                                        value={ticketCode}
                                        onChange={e => { setTicketCode(e.target.value); setResult(null) }}
                                        placeholder="TIX-XXXXXXXXXXXXXXX"
                                        autoFocus
                                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-mono outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !ticketCode.trim()}
                                    className="w-full bg-[#6366F1] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#4F46E5] transition disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ScanLine size={16} />
                                            Check In
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Result */}
                            {result && (
                                <div className={`mt-6 p-5 rounded-2xl border ${
                                    result.success
                                        ? 'bg-emerald-50 border-emerald-100'
                                        : 'bg-red-50 border-red-100'
                                }`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        {result.success ? (
                                            <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                                        ) : (
                                            <XCircle size={20} className="text-red-500 shrink-0" />
                                        )}
                                        <p className={`font-bold text-sm ${result.success ? 'text-emerald-700' : 'text-red-700'}`}>
                                            {result.message}
                                        </p>
                                    </div>
                                    {result.success && (
                                        <div className="pl-8 space-y-1">
                                            <p className="text-sm text-emerald-600">
                                                <span className="font-semibold">Name:</span> {result.name}
                                            </p>
                                            <p className="text-sm text-emerald-600">
                                                <span className="font-semibold">Check-in time:</span>{' '}
                                                {new Date(result.time).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}