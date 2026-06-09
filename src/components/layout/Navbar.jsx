import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../common/Button";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="font-['Geist'] font-bold text-xl text-[#6366F1] tracking-tight">Eventra
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Testimonials"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-sm text-[#0F172A] hover:text-[#6366F1] transition-colors px-4 py-2"
                    >
                        Login
                    </Link>

                    <Link to="/register">
                        <Button size="sm">Create Account</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}