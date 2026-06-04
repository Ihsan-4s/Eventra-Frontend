import { useEffect, useState } from 'react'
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import NavbarDashboard from '../../components/layout/NavbarDashboard'
import Footer from '../../components/layout/Footer'
import api from '../../api/axios'

export default function Categories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [newName, setNewName] = useState('')
    const [editId, setEditId] = useState(null)
    const [editName, setEditName] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const fetchCategories = () => {
        api.get('/categories')
            .then(res => setCategories(res.data.categories))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => { fetchCategories() }, [])

    const handleCreate = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            await api.post('/categories', { name: newName })
            setNewName('')
            fetchCategories()
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal membuat kategori.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleUpdate = async (id) => {
        setError('')
        setSubmitting(true)
        try {
            await api.put(`/categories/${id}`, { name: editName })
            setEditId(null)
            fetchCategories()
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mengupdate kategori.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Hapus kategori ini?')) return
        try {
            await api.delete(`/categories/${id}`)
            fetchCategories()
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menghapus kategori.')
        }
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF]">
            <Sidebar />
            <div className="ml-[250px]">
                <NavbarDashboard title="Categories" />
                <main className="p-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Create Form */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
                            <h2 className="font-['Geist'] text-lg font-bold text-[#0F172A] mb-4">Add Category</h2>
                            {error && (
                                <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleCreate} className="flex gap-3">
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={e => { setNewName(e.target.value); setError('') }}
                                    placeholder="Category name..."
                                    required
                                    className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition"
                                />
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex items-center gap-2 bg-[#6366F1] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#4F46E5] transition disabled:opacity-60"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>
                            </form>
                        </div>

                        {/* List */}
                        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                                <h2 className="font-['Geist'] text-lg font-bold text-[#0F172A]">All Categories</h2>
                            </div>
                            {loading ? (
                                <div className="p-8 text-center text-slate-400 text-sm">Loading...</div>
                            ) : categories.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 text-sm">No categories yet.</div>
                            ) : (
                                <ul className="divide-y divide-slate-100">
                                    {categories.map(cat => (
                                        <li key={cat.id} className="flex items-center justify-between px-6 py-4">
                                            {editId === cat.id ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={e => setEditName(e.target.value)}
                                                    className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-[#6366F1] mr-3"
                                                />
                                            ) : (
                                                <span className="text-sm font-medium text-[#0F172A]">{cat.name}</span>
                                            )}
                                            <div className="flex items-center gap-2">
                                                {editId === cat.id ? (
                                                    <>
                                                        <button onClick={() => handleUpdate(cat.id)} disabled={submitting}
                                                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition">
                                                            <Check size={15} />
                                                        </button>
                                                        <button onClick={() => setEditId(null)}
                                                            className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition">
                                                            <X size={15} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => { setEditId(cat.id); setEditName(cat.name) }}
                                                            className="p-2 rounded-lg bg-[#EEF1FF] text-[#6366F1] hover:bg-indigo-100 transition">
                                                            <Pencil size={15} />
                                                        </button>
                                                        <button onClick={() => handleDelete(cat.id)}
                                                            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    )
}