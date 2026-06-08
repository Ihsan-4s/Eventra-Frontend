import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../App.css'

// Public Pages
import Landing from '../pages/public/Landing'
import EventDetail from '../pages/public/EventDetail'
import EventRegister from '../pages/public/Register'
import Payment from '../pages/public/Payment'
import Ticket from '../pages/public/Ticket'

//Auth Pages
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

// Organizer Pages
import Dashboard from '../pages/organizer/Dashboard'
import MyEvents from '../pages/organizer/MyEvents'
import EventForm from '../pages/organizer/EventForm'
import Participants from '../pages/organizer/Participants'
import CheckIn from '../pages/organizer/CheckIn'
import Reports from '../pages/organizer/Report'

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import Categories from '../pages/admin/Categories'
import AdminEvents from '../pages/admin/AdminEvents'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth()
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }
    if (!user){
        return <Navigate to="/login" replace />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to="/login" replace />
    }
    return children
}

const GuestRoute = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading){
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }
    if (user) {
        return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/organizer/dashboard'} replace />
    }
    return children
}

export default function AppRoutes() {
    return(
        <BrowserRouter>
        <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/events/:slug/register" element={<EventRegister />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/payment/:transactionId" element={<Payment />} />
            <Route path="/ticket/:ticketCode" element={<Ticket />} />

            {/* Auth */}
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

            {/* Organizer */}
            <Route path="/organizer/dashboard" element={<ProtectedRoute allowedRoles={['organizer']}><Dashboard /></ProtectedRoute>} />
            <Route path="/organizer/events" element={<ProtectedRoute allowedRoles={['organizer']}><MyEvents /></ProtectedRoute>} />
            <Route path="/organizer/events/create" element={<ProtectedRoute allowedRoles={['organizer']}><EventForm /></ProtectedRoute>} />
            <Route path="/organizer/events/:id/edit" element={<ProtectedRoute allowedRoles={['organizer']}><EventForm /></ProtectedRoute>} />
            <Route path="/organizer/participants" element={<ProtectedRoute allowedRoles={['organizer']}><Participants /></ProtectedRoute>} />
            <Route path="/organizer/checkin" element={<ProtectedRoute allowedRoles={['organizer']}><CheckIn /></ProtectedRoute>} />
            <Route path="/organizer/reports" element={<ProtectedRoute allowedRoles={['organizer']}><Reports /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><Categories /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><AdminEvents /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
    )
}