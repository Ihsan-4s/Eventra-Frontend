import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import {
    LayoutDashboard,
    CalendarDays,
    PlusCircle,
    Users,
    CreditCard,
    ScanLine,
    BarChart3,
    Tag,
    LogOut,
} from 'lucide-react'

const organizerMenu = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/organizer/dashboard' },
    { label: 'My Events', icon: CalendarDays, path: '/organizer/events' },
    { label: 'Participants', icon: Users, path: '/organizer/participants' },
    { label: 'Transactions', icon: CreditCard, path: '/organizer/transactions' },
    { label: 'Check-in', icon: ScanLine, path: '/organizer/checkin' },
    { label: 'Reports', icon: BarChart3, path: '/organizer/reports' },
]

const adminMenu = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Categories', icon: Tag, path: '/admin/categories' },
    { label: 'Events', icon: CalendarDays, path: '/admin/events' },
]

export default function Sidebar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const menuItems = user?.role === 'admin' ? adminMenu : organizerMenu

    const handleLogout = async () => {
        try {
            await api.post('/logout')
        } catch (err) {
            console.error(err)
        } finally {
            logout()
            navigate('/login')
        }
    }

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-[250px] flex-col border-r border-slate-200 bg-white shadow-[8px_0_30px_rgba(15,23,42,0.08)]">
            <div className="px-6 pt-8 pb-6">
                <h1 className="font-['Geist'] text-[22px] font-bold leading-none text-[var(--primary)]">
                    Eventra {user?.role === 'admin' ? 'Admin' : 'Pro'}
                </h1>
                <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
                    {user?.role === 'admin' ? 'Platform Manager' : 'Enterprise Planner'}
                </p>
            </div>

            <nav className="flex-1 px-3">
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path
                        return (
                            <li key={item.label}>
                                <button
                                    type="button"
                                    onClick={() => navigate(item.path)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-indigo-100 text-[var(--secondary)]'
                                            : 'text-[var(--secondary)] hover:bg-slate-100'
                                    }`}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={2}
                                        className={isActive ? 'text-[var(--primary)]' : 'text-slate-700'}
                                    />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="px-4 pb-7">
                <div className="border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-[13px] font-semibold text-slate-700 transition hover:bg-slate-100 cursor-pointer"
                    >
                        <LogOut size={18} strokeWidth={2} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    )
}