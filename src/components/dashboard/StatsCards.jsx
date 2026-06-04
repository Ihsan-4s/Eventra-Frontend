import { useEffect, useState } from 'react'
import { CalendarDays, CheckCircle, Users, DollarSign, ScanLine } from 'lucide-react'
import api from '../../api/axios'

const cards = [
    { key: 'total_events', label: 'Total Events', icon: CalendarDays, color: 'text-[#6366F1] bg-[#EEF1FF]' },
    { key: 'published_events', label: 'Published', icon: CheckCircle, color: 'text-emerald-500 bg-emerald-50' },
    { key: 'total_participants', label: 'Participants', icon: Users, color: 'text-orange-500 bg-orange-50' },
    { key: 'total_revenue', label: 'Revenue', icon: DollarSign, color: 'text-blue-500 bg-blue-50', isCurrency: true },
    { key: 'total_check_in', label: 'Check-ins', icon: ScanLine, color: 'text-rose-500 bg-rose-50' },
]

export default function StatsCards() {
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/organizer/dashboard')
            .then(res => setSummary(res.data.summary))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
            {cards.map(({ key, label, icon: Icon, color, isCurrency }) => (
                <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                            <Icon size={18} />
                        </div>
                        <span className="text-sm text-slate-500">{label}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#0F172A] font-['Geist']">
                        {loading ? (
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
    )
}