export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <span className="font-['Geist'] font-bold text-[#6366F1] text-lg block mb-2">Eventra</span>
                    <p className="text-xs text-[#64748B] leading-relaxed">Event management, refined. Professional tools for world-class planners.</p>
                </div>
            </div>
            <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-[#64748B]">© 2026 Eventra Technologies Inc.</p>
            </div>
        </footer>
    )
}