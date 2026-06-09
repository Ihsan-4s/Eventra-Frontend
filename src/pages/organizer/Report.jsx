import { useEffect, useState } from 'react'
import { FileText, FileSpreadsheet, Download } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

const exports = [
    {
        title: 'Registrations',
        desc: 'Export data peserta yang telah mendaftar',
        icon: FileText,
        color: 'text-[#6366F1] bg-[#EEF1FF]',
        buttons: [
            { label: 'PDF', type: 'registrations/pdf', icon: FileText },
            { label: 'XLSX', type: 'registrations/xlsx', icon: FileSpreadsheet },
        ]
    },
    {
        title: 'Payments',
        desc: 'Export data transaksi pembayaran event',
        icon: FileSpreadsheet,
        color: 'text-emerald-500 bg-emerald-50',
        buttons: [
            { label: 'PDF', type: 'payments/pdf', icon: FileText },
            { label: 'XLSX', type: 'payments/xlsx', icon: FileSpreadsheet },
        ]
    },
]

export default function Reports() {
    const [events, setEvents] = useState([])
    const [selectedEvent, setSelectedEvent] = useState('')

    useEffect(() => {
        api.get('/organizer/events?per_page=100')
            .then(res => {
                setEvents(res.data.data)
                if (res.data.data.length > 0) setSelectedEvent(res.data.data[0].id)
            })
            .catch(err => console.error(err))
    }, [])

    const handleExport = (type) => {
        const token = localStorage.getItem('token')
        const url = `http://localhost:8000/api/organizer/events/${selectedEvent}/export/${type}`
        
        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        })
        .then(res => res.blob())
        .then(blob => {
            const ext = type.includes('pdf') ? 'pdf' : 'xlsx'
            const filename = `export-${type.replace('/', '-')}-event-${selectedEvent}.${ext}`
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = filename
            link.click()
            URL.revokeObjectURL(link.href)
        })
        .catch(err => {
            console.error(err)
            alert('Export gagal.')
        })
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <main className="p-8">

                    <div className="mb-8">
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

                    {/* Export Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {exports.map(exp => {
                            const Icon = exp.icon
                            return (
                                <div key={exp.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${exp.color}`}>
                                            <Icon size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-['Geist'] font-bold text-[#0F172A]">{exp.title}</h3>
                                            <p className="text-xs text-slate-400 mt-0.5">{exp.desc}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        {exp.buttons.map(btn => {
                                            const BtnIcon = btn.icon
                                            return (
                                                <button
                                                    key={btn.label}
                                                    onClick={() => handleExport(btn.type)}
                                                    disabled={!selectedEvent}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-[#EEF1FF] hover:border-[#6366F1]/30 hover:text-[#6366F1] transition disabled:opacity-40 cursor-pointer"
                                                >
                                                    <BtnIcon size={15} />
                                                    Export {btn.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}