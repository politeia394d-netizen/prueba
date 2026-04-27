import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Movements from './pages/Movements'
import Reports from './pages/Reports'

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/categories" 
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/movements" 
        element={
          <ProtectedRoute>
            <Movements />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
