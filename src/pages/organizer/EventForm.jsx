import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ImagePlus } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import NavbarDashboard from '../../components/layout/NavbarDashboard'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

export default function EventForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = !!id

    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({
        category_id: '',
        organization_name: '',
        title: '',
        description: '',
        location: '',
        event_date: '',
        price: '',
        quota: '',
        status: 'draft',
    })
    const [banner, setBanner] = useState(null)
    const [bannerPreview, setBannerPreview] = useState(null)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    // Fetch categories
    useEffect(() => {
        api.get('/categories')
            .then(res => setCategories(res.data.categories))
            .catch(err => console.error(err))
    }, [])

    // Fetch event data kalau edit
    useEffect(() => {
        if (!isEdit) return
        api.get(`/organizer/events`)
            .then(res => {
                const event = res.data.data.find(e => e.id === parseInt(id))
                if (event) {
                    setForm({
                        category_id: event.category_id,
                        organization_name: event.organization_name,
                        title: event.title,
                        description: event.description,
                        location: event.location,
                        event_date: event.event_date.slice(0, 10),
                        price: event.price,
                        quota: event.quota,
                        status: event.status,
                    })
                    if (event.banner) setBannerPreview(`http://localhost:8000/storage/${event.banner}`)
                }
            })
            .catch(err => console.error(err))
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: null })
    }

    const handleBanner = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setBanner(file)
        setBannerPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors({})

        const formData = new FormData()
        Object.entries(form).forEach(([key, val]) => formData.append(key, val))
        if (banner) formData.append('banner', banner)
        if (isEdit) formData.append('_method', 'PUT')

        try {
            if (isEdit) {
                await api.post(`/organizer/events/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            } else {
                await api.post('/organizer/events', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }
            navigate('/organizer/events')
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            } else {
                alert(err.response?.data?.message || 'Gagal menyimpan event.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <NavbarDashboard title={isEdit ? 'Edit Event' : 'Create Event'} />
                <main className="p-8">
                    <div className="max-w-3xl">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="font-['Geist'] text-xl font-bold text-[#0F172A] mb-6">
                                {isEdit ? 'Edit Event' : 'Create New Event'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Banner Upload */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-2">Banner</label>
                                    <label className="cursor-pointer block">
                                        <div className={`rounded-xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center transition hover:border-[#6366F1] ${bannerPreview ? 'h-48' : 'h-36'}`}>
                                            {bannerPreview ? (
                                                <img src={bannerPreview} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center">
                                                    <ImagePlus size={28} className="mx-auto text-slate-300 mb-2" />
                                                    <p className="text-xs text-slate-400">Click to upload banner</p>
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleBanner} className="hidden" />
                                    </label>
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Music Festival 2026"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                    />
                                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title[0]}</p>}
                                </div>

                                {/* Organization Name */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Organization Name</label>
                                    <input
                                        type="text"
                                        name="organization_name"
                                        value={form.organization_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Eventra Org"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                    />
                                    {errors.organization_name && <p className="text-xs text-red-500 mt-1">{errors.organization_name[0]}</p>}
                                </div>

                                {/* Category & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Category</label>
                                        <select
                                            name="category_id"
                                            value={form.category_id}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition bg-white"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        {errors.category_id && <p className="text-xs text-red-500 mt-1">{errors.category_id[0]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Status</label>
                                        <select
                                            name="status"
                                            value={form.status}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition bg-white"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Description</label>
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Describe your event..."
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition resize-none"
                                    />
                                    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description[0]}</p>}
                                </div>

                                {/* Location & Date */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Location/Online</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            placeholder="e.g. Jakarta"
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                        />
                                        {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location[0]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Event Date</label>
                                        <input
                                            type="date"
                                            name="event_date"
                                            value={form.event_date}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                        />
                                        {errors.event_date && <p className="text-xs text-red-500 mt-1">{errors.event_date[0]}</p>}
                                    </div>
                                </div>

                                {/* Price & Quota */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Price (Rp)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={form.price}
                                            onChange={handleChange}
                                            placeholder="e.g. 150000"
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                        />
                                        {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price[0]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">Quota</label>
                                        <input
                                            type="number"
                                            name="quota"
                                            value={form.quota}
                                            onChange={handleChange}
                                            placeholder="e.g. 100"
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                        />
                                        {errors.quota && <p className="text-xs text-red-500 mt-1">{errors.quota[0]}</p>}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#6366F1] text-white px-8 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4F46E5] transition disabled:opacity-60"
                                    >
                                        {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/organizer/events')}
                                        className="px-6 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}