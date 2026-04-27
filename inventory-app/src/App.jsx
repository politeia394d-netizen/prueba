import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Layout components
import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'

// Pages
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Movements from './pages/Movements'
import Reports from './pages/Reports'
import Users from './pages/Users'
import Settings from './pages/Settings'

// Protected Route Wrapper
const ProtectedLayout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <Layout>
      <Header />
      <Sidebar />
      {children}
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProtectedLayout>
              <Products />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/categories" 
          element={
            <ProtectedLayout>
              <Categories />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/movements" 
          element={
            <ProtectedLayout>
              <Movements />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <ProtectedLayout>
              <Reports />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedLayout>
              <Users />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedLayout>
              <Settings />
            </ProtectedLayout>
          } 
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
