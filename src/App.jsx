import Landing from './pages/public/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/organizer/Dashboard'
import MyEvents from './pages/organizer/MyEvents'
import EventForm from './pages/organizer/EventForm'
import EventDetail from './pages/public/EventDetail'
import EventRegister from './pages/public/Register'
import Payment from './pages/public/Payment'
import Ticket from './pages/public/Ticket'
import AdminDashboard from './pages/admin/AdminDashboard'
import Categories from './pages/admin/Categories'
import AdminEvents from './pages/admin/AdminEvents'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './App.css'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />
  return children
}

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (user) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/organizer/dashboard'} replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/admin/admindashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute allowedRoles={['admin']}><Categories /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><AdminEvents /></ProtectedRoute>} />
        <Route path="/organizer/dashboard" element={<ProtectedRoute allowedRoles={['organizer']}><Dashboard /></ProtectedRoute>} />
        <Route path="/organizer/events" element={<ProtectedRoute allowedRoles={['organizer']}><MyEvents /></ProtectedRoute>} />
        <Route path="/organizer/events/create" element={<ProtectedRoute allowedRoles={['organizer']}><EventForm /></ProtectedRoute>} />
        <Route path="/organizer/events/:id/edit" element={<ProtectedRoute allowedRoles={['organizer']}><EventForm /></ProtectedRoute>} />
        <Route path="/events/:slug/register" element={<EventRegister />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/payment/:transactionId" element={<Payment />} />
        <Route path="/ticket/:ticketCode" element={<Ticket />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App