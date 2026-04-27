import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, clearError } from '../store/slices/authSlice'
import Swal from 'sweetalert2'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    email: 'admin@inventario.com',
    password: 'admin123'
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error')
      return
    }

    try {
      await dispatch(login(formData)).unwrap()
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Iniciando sesión...',
        timer: 1500,
        showConfirmButton: false
      })
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      Swal.fire('Error', 'Credenciales incorrectas', 'error')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand-logo">
          <h2><i className="fas fa-boxes"></i> InventarioPro</h2>
          <p className="text-muted">Sistema de Gestión</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="admin@inventario.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">Recordarme</label>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Iniciando...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt me-2"></i>
                Ingresar
              </>
            )}
          </button>
        </form>
        
        <div className="mt-3 text-center">
          <p className="text-muted mb-0">Demo: admin@inventario.com / admin123</p>
        </div>
      </div>
    </div>
  )
}

export default Login
