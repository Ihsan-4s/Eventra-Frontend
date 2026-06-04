import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from 'react'
import api from '../../api/axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip
);

export default function ChartOverview() {
    const [monthlyData, setMonthlyData] = useState([20, 35, 28, 60, 25, 70]) // dummy dulu
    const [labels, setLabels] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun",])

    useEffect(() => {
        api.get('/organizer/dashboard')
            .then(res => {
                const monthly = res.data.data?.monthly_revenue
                if (monthly) {
                    setLabels(monthly.map(m => m.month))
                    setMonthlyData(monthly.map(m => m.total))
                }
            })
            .catch(err => console.error(err))
    }, [])

    const data = {
        labels,
        datasets: [
            {
                data: monthlyData,
                borderColor: "#6366F1",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                fill: true,
                tension: 0.45,
                pointRadius: 4,
                pointHoverRadius: 6,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--secondary)]">
                            Revenue Analytics
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Monthly earnings overview
                        </p>
                    </div>

                    <span className="rounded-lg bg-[#EEF1FF] px-3 py-1 text-xs font-semibold text-[var(--secondary)]">
                        Last 6 Months
                    </span>
                </div>

                <div className="h-[250px] rounded-xl bg-[#EEF1FF] p-4" style={{ width: 700, maxWidth: '100%' }}>
                    <Line data={data} options={options} />
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
                    Kelola event, peserta, transaksi, dan check-in dalam satu dashboard
                    yang simpel dan rapi.
                </p>
                <Link to="/organizer/events/create">
                    <button className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-[var(--primary)] transition hover:bg-slate-100">
                        Create New Event
                    </button>
                </Link>
            </div>
        </section>
    );
}