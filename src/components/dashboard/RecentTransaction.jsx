import { useEffect, useState } from 'react'
import { Funnel } from 'lucide-react'
import api from '../../api/axios'

export default function RecentTransactions() {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/organizer/dashboard')
            .then(res => {
                const data = res.data.data?.recent_transactions
                if (data) setTransactions(data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6">
                <h2 className="text-2xl font-bold text-[var(--secondary)]">
                    Recent Transactions
                </h2>

                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition">
                    <Funnel size={18} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#EEF1FF]">
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Customer
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Event
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Amount
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.id}
                                className="border-t border-slate-100 hover:bg-slate-50 transition"
                            >
                                <td className="px-6 py-5 font-medium text-slate-800">
                                    {transaction.customer}
                                </td>

                                <td className="px-6 py-5 text-slate-600">
                                    {transaction.event}
                                </td>

                                <td className="px-6 py-5 text-slate-600">
                                    {transaction.date}
                                </td>

                                <td className="px-6 py-5 font-bold text-slate-900">
                                    {transaction.amount}
                                </td>

                                <td className="px-6 py-5">
                                    <span
                                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${transaction.status === "Completed"
                                            ? "bg-green-50 text-green-600"
                                            : "bg-yellow-50 text-yellow-600"
                                            }`}
                                    >
                                        <span
                                            className={`h-2 w-2 rounded-full ${transaction.status === "Completed"
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                        />

                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}