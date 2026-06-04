import { Search, Bell, Settings } from "lucide-react";

export default function NavbarDashboard() {
    return (
        <header className="sticky top-0 z-30 h-16 border-b border-slate-100 bg-[#F8F9FF]">
            <div className="flex h-full items-center justify-between px-8">
                <div className="flex items-center gap-6">
                    <h1 className="font-['Geist'] text-2xl font-bold text-[var(--primary)]">
                        Dashboard
                    </h1>

                    <div className="relative hidden w-[310px] sm:block">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search events..."
                            className="h-10 w-full rounded-full bg-[#EEF1FF] pl-11 pr-4 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--primary)]/20"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}