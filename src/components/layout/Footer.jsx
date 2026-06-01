export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <span className="font-['Geist'] font-bold text-[#6366F1] text-lg block mb-2">Eventra</span>
                    <p className="text-xs text-[#64748B] leading-relaxed">Event management, refined. Professional tools for world-class planners.</p>
                </div>
                {[
                    { title: 'Product', links: ['Features', 'Enterprise', 'Solutions', 'API Docs'] },
                    { title: 'Company', links: ['About Us', 'Help Center', 'Terms of Service', 'Privacy Policy'] },
                ].map((col) => (
                    <div key={col.title}>
                        <h4 className="font-['Geist'] font-semibold text-[#0F172A] text-sm mb-3">{col.title}</h4>
                        <ul className="flex flex-col gap-2">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-xs text-[#64748B] hover:text-[#6366F1] transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-[#64748B]">© 2026 Eventra Technologies Inc.</p>
            </div>
        </footer>
    )
}