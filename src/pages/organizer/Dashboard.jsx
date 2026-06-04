import Sidebar from "../../components/layout/Sidebar"
import NavbarDashboard from "../../components/layout/NavbarDashboard"
import ChartOverview from "../../components/dashboard/ChartOverview"
import StatsCards from "../../components/dashboard/StatsCards"
import Footer from "../../components/layout/Footer"
import RecentTransactions from "../../components/dashboard/RecentTransaction"

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <NavbarDashboard />
                <main className="p-8">
                    <StatsCards />
                    <div className="mb-8">
                        <ChartOverview />
                    </div>
                    <RecentTransactions />
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    )
}