import { Search, Bell, Settings } from "lucide-react";

export default function NavbarDashboard() {
    return (
        <header className="sticky top-0 z-30 h-16 border-b border-slate-100 bg-[#F8F9FF]">
            <div className="flex h-full items-center justify-between px-8">
                <div className="flex items-center gap-6">
                    <h1 className="font-['Geist'] text-2xl font-bold text-[var(--primary)]">
                        Dashboard
                    </h1>
                </div>
            </div>
        </header>
    );
}