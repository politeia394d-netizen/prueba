import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { fetchProducts } from '../store/slices/productsSlice'
import { fetchMovements } from '../store/slices/movementsSlice'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { items: products } = useSelector((state) => state.products)
  const { items: movements } = useSelector((state) => state.movements)

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchMovements())
  }, [dispatch])

  // Calcular estadísticas
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0)
  const lowStockProducts = products.filter(p => (p.stock || 0) <= (p.minStock || 5)).length

  // Datos para gráfico de barras - Productos por categoría
  const categoriesCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const barData = {
    labels: Object.keys(categoriesCount),
    datasets: [{
      label: 'Productos por Categoría',
      data: Object.values(categoriesCount),
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1
    }]
  }

  // Datos para gráfico doughnut - Distribución de stock
  const doughnutData = {
    labels: ['Stock Normal', 'Stock Bajo'],
    datasets: [{
      data: [totalProducts - lowStockProducts, lowStockProducts],
      backgroundColor: [
        'rgba(40, 167, 69, 0.7)',
        'rgba(220, 53, 69, 0.7)'
      ],
      borderColor: [
        'rgba(40, 167, 69, 1)',
        'rgba(220, 53, 69, 1)'
      ],
      borderWidth: 1
    }]
  }

  const handleLogout = async () => {
    await dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/dashboard" className="nav-link">Inicio</Link>
          </li>
        </ul>
        
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
              <i className="fas fa-user-circle me-1"></i>
              {user?.name || 'Usuario'}
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <a href="#" className="dropdown-item">
                <i className="fas fa-user me-2"></i> Perfil
              </a>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item text-danger">
                <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {/* Main Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/dashboard" className="brand-link">
          <span className="brand-text px-3">InventarioPro</span>
        </Link>

        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Productos</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  <i className="nav-icon fas fa-tags"></i>
                  <p>Categorías</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/movements" className="nav-link">
                  <i className="nav-icon fas fa-exchange-alt"></i>
                  <p>Movimientos</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/reports" className="nav-link">
                  <i className="nav-icon fas fa-chart-line"></i>
                  <p>Reportes</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Content Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-end">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Info boxes */}
            <div className="row">
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                  <span className="info-box-icon bg-gradient-primary">
                    <i className="fas fa-box"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Total Productos</span>
                    <span className="info-box-number">{totalProducts}</span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-gradient-success">
                    <i className="fas fa-cubes"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Stock Total</span>
                    <span className="info-box-number">{totalStock}</span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-gradient-warning">
                    <i className="fas fa-dollar-sign"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Valor Inventario</span>
                    <span className="info-box-number">${totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
              
              <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box mb-3">
                  <span className="info-box-icon bg-gradient-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                  <div className="info-box-content">
                    <span className="info-box-text">Stock Bajo</span>
                    <span className="info-box-number">{lowStockProducts}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas de stock bajo */}
            {lowStockProducts > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-stock-bajo">
                    <h5><i className="icon fas fa-exclamation-triangle"></i> Alerta de Stock Bajo</h5>
                    <p>Los siguientes productos tienen stock por debajo del mínimo:</p>
                    <ul className="mb-0">
                      {products.filter(p => (p.stock || 0) <= (p.minStock || 5)).map(p => (
                        <li key={p.id}><strong>{p.name}</strong>: {p.stock} unidades (mínimo: {p.minStock})</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Gráficos */}
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Productos por Categoría</h3>
                  </div>
                  <div className="card-body">
                    <div className="chart-container">
                      <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Distribución de Stock</h3>
                  </div>
                  <div className="card-body">
                    <div className="chart-container">
                      <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Últimos movimientos */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Últimos Movimientos</h3>
                    <Link to="/movements" className="btn btn-sm btn-primary float-end">Ver todos</Link>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Fecha</th>
                            <th>Producto</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Usuario</th>
                          </tr>
                        </thead>
                        <tbody>
                          {movements.slice(0, 5).map(movement => (
                            <tr key={movement.id}>
                              <td>{new Date(movement.date).toLocaleDateString('es-ES')}</td>
                              <td>{movement.productName}</td>
                              <td>
                                <span className={`badge ${movement.type === 'entrada' ? 'bg-success' : 'bg-danger'}`}>
                                  {movement.type === 'entrada' ? 'Entrada' : 'Salida'}
                                </span>
                              </td>
                              <td>{movement.quantity}</td>
                              <td>{movement.user}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="main-footer">
        <div className="float-end d-none d-sm-inline">
          <b>Versión</b> 1.0.0
        </div>
        <strong>InventarioPro</strong> - Sistema de Gestión de Inventarios
      </footer>
    </div>
  )
}

export default Dashboard
