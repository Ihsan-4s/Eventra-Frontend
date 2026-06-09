import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { CalendarPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../../api/axios'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export default function ChartOverview() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        api.get('/organizer/events')
            .then(res => setEvents(res.data.data))
            .catch(err => console.error(err))
    }, [])

    const data = {
        labels: events.map(e => e.title.length > 20 ? e.title.slice(0, 20) + '...' : e.title),
        datasets: [{
            data: events.map(e => Number(e.price)),
            backgroundColor: '#6366F1',
            borderRadius: 8,
            hoverBackgroundColor: '#4F46E5',
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0F172A',
                padding: 12,
                displayColors: false,
                callbacks: {
                    label: ctx => `Rp ${Number(ctx.raw).toLocaleString('id-ID')}`
                }
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748B', font: { size: 11 } },
                border: { display: false },
            },
            y: {
                display: false,
            },
        },
    }

    return (
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--secondary)]">Event Overview</h2>
                        <p className="mt-1 text-sm text-slate-500">Ticket price per event</p>
                    </div>
                </div>
                <div className="h-[250px] rounded-xl bg-[#EEF1FF] p-4">
                    {events.length > 0
                        ? <Bar data={data} options={options} />
                        : <div className="h-full flex items-center justify-center text-slate-400 text-sm">No events yet.</div>
                    }
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[var(--primary)] p-6 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[var(--primary)]">
                    <CalendarPlus size={24} />
                </div>
                <h2 className="text-2xl font-bold leading-tight text-white">
                    Organize Events Easier with Eventra
                </h2>
                <p className="mt-3 text-sm leading-6 text-white">
                    Kelola event, peserta, transaksi, dan check-in dalam satu dashboard yang simpel dan rapi.
                </p>
                <Link to="/organizer/events/create">
                    <button className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-[var(--primary)] transition hover:bg-slate-100">
                        Create New Event
                    </button>
                </Link>
            </div>
        </section>
    )
}