import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    CalendarDays,
    MapPin,
    Users,
    Building2,
    Clock,
    Share2,
    CheckCircle2,
    Navigation,
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

export default function EventDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/events/${slug}`)
            .then(res => setEvent(res.data.event))
            .catch(() => navigate('/'))
            .finally(() => setLoading(false))
    }, [slug, navigate])

    const formatDate = date => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
    }

    const formatShortDate = date => {
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    const formatPrice = price => {
        return Number(price) === 0
            ? 'Free'
            : `Rp ${Number(price).toLocaleString('id-ID')}`
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F6FF] flex items-center justify-center">
                <div className="w-9 h-9 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!event) return null

    return (
        <div className="min-h-screen bg-[#F4F6FF] text-[#0F172A]">

            <section className="relative">
                <div className="relative h-[360px] w-full overflow-hidden bg-slate-900">
                    {event.banner ? (
                        <img
                            src={`http://localhost:8000/storage/${event.banner}`}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800">
                            <CalendarDays size={64} className="text-white/30" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/35 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="max-w-6xl mx-auto px-6 pb-8">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="px-3 py-1.5 rounded-full bg-white text-[#6366F1] text-xs font-bold">
                                    {event.category?.name || 'Event'}
                                </span>
                                <span className="px-3 py-1.5 rounded-full bg-white/90 text-emerald-600 text-xs font-bold capitalize">
                                    {event.status}
                                </span>
                                <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-700 text-xs font-bold">
                                    {event.quota} Seats
                                </span>
                            </div>

                            <h1 className="font-['Geist'] text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 mt-5 text-sm text-white/90">
                                <div className="flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-2 rounded-full">
                                    <CalendarDays size={15} />
                                    {formatShortDate(event.event_date)}
                                </div>

                                <div className="flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-2 rounded-full">
                                    <MapPin size={15} />
                                    {event.location}
                                </div>

                                <div className="flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-2 rounded-full">
                                    <Building2 size={15} />
                                    {event.organization_name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

                    {/* LEFT CONTENT */}
                    <div className="space-y-6">

                        {/* ABOUT */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                            <h2 className="font-['Geist'] text-xl font-bold mb-4">
                                About the Event
                            </h2>

                            <p className="text-sm text-slate-600 leading-7 whitespace-pre-line">
                                {event.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
                                <InfoItem
                                    icon={CalendarDays}
                                    label="Event Date"
                                    value={formatDate(event.event_date)}
                                />

                                <InfoItem
                                    icon={MapPin}
                                    label="Location"
                                    value={event.location}
                                />

                                <InfoItem
                                    icon={Users}
                                    label="Quota"
                                    value={`${event.quota} participants`}
                                />

                                <InfoItem
                                    icon={Building2}
                                    label="Organizer"
                                    value={event.organization_name}
                                />
                            </div>
                        </section>
                        {/* ORGANIZER */}
                        <section className="bg-[#EEF1FF] rounded-2xl border border-indigo-100 p-6 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold text-lg">
                                {event.organization_name?.charAt(0) || 'E'}
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Hosted by</p>
                                <h3 className="font-['Geist'] font-bold text-[#0F172A]">
                                    {event.organization_name}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Official organizer of this event.
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT CARD */}
                    <aside className="lg:sticky lg:top-24">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                            <div className="p-6 border-b border-slate-100">
                                <p className="text-xs text-slate-400 font-semibold mb-1">
                                    Ticket Price
                                </p>

                                <div className="flex items-end justify-between gap-3">
                                    <h2 className="font-['Geist'] text-3xl font-bold text-[#6366F1]">
                                        {formatPrice(event.price)}
                                    </h2>

                                    <span className="text-xs font-semibold bg-[#EEF1FF] text-[#6366F1] px-3 py-1 rounded-full">
                                        Early Ticket
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <MiniInfo
                                    label="Date"
                                    value={formatShortDate(event.event_date)}
                                    icon={CalendarDays}
                                />

                                <MiniInfo
                                    label="Location"
                                    value={event.location}
                                    icon={MapPin}
                                />

                                <MiniInfo
                                    label="Available Seats"
                                    value={`${event.quota} slots`}
                                    icon={Users}
                                />

                                <button
                                    onClick={() => navigate(`/events/${slug}/register`)}
                                    className="w-full mt-3 bg-[#6366F1] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#4F46E5] transition shadow-sm cursor-pointer"
                                >
                                    Register Now
                                </button>

                                <p className="text-xs text-center text-slate-400 leading-relaxed">
                                    Secure your seat before the registration quota runs out.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 bg-[#EEF1FF] rounded-2xl border border-indigo-100 p-4 flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#6366F1] flex items-center justify-center shrink-0">
                                <Navigation size={16} className="text-white" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#0F172A]">
                                    Official Event
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    Managed by {event.organization_name}
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function InfoItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-[#EEF1FF] flex items-center justify-center shrink-0">
                <Icon size={18} className="text-[#6366F1]" />
            </div>

            <div>
                <p className="text-xs text-slate-400 font-medium">{label}</p>
                <p className="text-sm font-semibold text-[#0F172A] mt-1">{value}</p>
            </div>
        </div>
    )
}

function MiniInfo({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-500">
                <Icon size={15} className="text-slate-400" />
                <span>{label}</span>
            </div>

            <p className="font-semibold text-[#0F172A] text-right line-clamp-1">
                {value}
            </p>
        </div>
    )
}