import { Link } from 'react-router-dom'
import Footer from '../../components/layout/Footer'
import Navbar from '../../components/layout/Navbar'
import Button from '../../components/common/Button'

export default function Landing() {
    const features = [
        {
            title: 'Rapid Event Creation',
            desc: 'Deploy complex multi-track events in minutes with our intelligent template engine and logic-based scheduling.',
        },
        {
            title: 'QR Payments',
            desc: 'Seamless, instant transactions on-site. Frictionless for attendees, transparent for you.',
        },
        {
            title: 'Advanced Analytics',
            desc: 'Real-time engagement metrics and conversion data presented in a beautiful, digestible interface.',
        },
        {
            title: 'Team Collaboration',
            desc: 'Manage permissions, assign tasks, and coordinate with stakeholders in a single unified thread.',
        },
    ]
    const testimonials = [
        {
            text: '"Eventra transformed our annual summit. The check-in process was 4x faster than our previous solution."',
            name: 'Sarah Chen',
            role: 'Director @ TechScale',
        },
        {
            text: '"The financial reporting and QR payment integration is a game-changer for high-volume trade shows."',
            name: 'Marcus Thorne',
            role: 'Operations Lead @ GlobalExpo',
        },
        {
            text: '"Precision minimalism at its best. The only event software that doesn\\\'t feel like it was built in the 90s."',
            name: 'Elena Rodriguez',
            role: 'Founder @ Aura Events',
        },
    ]
    return (
        <div className="min-h-screen">
            <Navbar />
            <section className="min-h-screen bg-[#F1F2FE] flex flex-col items-center justify-center text-center px-6 pt-16">
                <h1 className="font-['Geist'] text-5xl md:text-6xl font-bold text-[#0F172A] leading-tight max-w-3xl mb-4">
                    Event Management, <em className="text-[#6366F1] not-italic">Refined.</em>
                </h1>
                <p className="text-[#64748B] text-lg max-w-xl mb-10 leading-relaxed">
                    The precision-engineered workspace for modern enterprise planners.
                    Orchestrate complex global events with mathematical efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <Link to="/register">
                        <Button size="lg">Start Planning Now</Button>
                    </Link>
                    <a href="#features">
                        <Button size="lg" variant="outlined">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                />
                            </svg>
                            Watch Demo
                        </Button>
                    </a>
                </div>
            </section>
            <section id="features" className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-['Geist'] text-4xl font-bold text-[#0F172A] mb-4">
                            Engineered for Excellence
                        </h2>
                        <p className="text-[#64748B] max-w-md mx-auto">
                            Focus on the experience, we'll handle the architecture. Powerful tools designed to be invisible.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="p-6 rounded-2xl border border-gray-100 hover:border-[#6366F1]/30 hover:shadow-lg hover:shadow-[#6366F1]/5 transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center mb-4">
                                    <div className="w-4 h-4 rounded bg-[#6366F1]/40" />
                                </div>
                                <h3 className="font-['Geist'] font-semibold text-[#0F172A] mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-sm text-[#64748B] leading-relaxed">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-24 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <h2 className="font-['Geist'] text-4xl font-bold text-[#0F172A] mb-2">
                            Trusted by Industry Leaders
                        </h2>
                        <p className="text-[#64748B] text-sm">
                            From tech summits to global gala dinners.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="testimonials">
                        {testimonials.map((t) => (
                            <div
                                key={t.name}
                                className="p-6 rounded-2xl border border-gray-100 hover:border-[#6366F1]/20 transition-colors"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 text-amber-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm text-[#64748B] leading-relaxed mb-5 italic">
                                    {t.text}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center text-xs font-bold text-[#6366F1]">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-[#0F172A]">
                                            {t.name}
                                        </p>
                                        <p className="text-xs text-[#64748B]">
                                            {t.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}