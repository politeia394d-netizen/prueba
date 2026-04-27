import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/slices/productsSlice'
import { fetchMovements } from '../store/slices/movementsSlice'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Reports = () => {
  const dispatch = useDispatch()
  const { items: products } = useSelector((state) => state.products)
  const { items: movements } = useSelector((state) => state.movements)
  
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchMovements())
  }, [dispatch])

  // Estadísticas generales
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0)
  const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0)
  const totalCost = products.reduce((sum, p) => sum + ((p.cost || 0) * (p.stock || 0)), 0)
  const profitMargin = totalValue > 0 ? ((totalValue - totalCost) / totalValue * 100) : 0
  const lowStockProducts = products.filter(p => (p.stock || 0) <= (p.minStock || 5)).length

  // Productos más valiosos
  const topProducts = [...products]
    .sort((a, b) => (b.price * b.stock) - (a.price * a.stock))
    .slice(0, 5)

  // Productos con stock bajo
  const lowStockList = products.filter(p => (p.stock || 0) <= (p.minStock || 5))

  // Movimientos por tipo
  const entradasCount = movements.filter(m => m.type === 'entrada').length
  const salidasCount = movements.filter(m => m.type === 'salida').length

  // Gráfico de valor por categoría
  const categoryValue = products.reduce((acc, p) => {
    const value = (p.price || 0) * (p.stock || 0)
    acc[p.category] = (acc[p.category] || 0) + value
    return acc
  }, {})

  const categoryChartData = {
    labels: Object.keys(categoryValue),
    datasets: [{
      label: 'Valor por Categoría ($)',
      data: Object.values(categoryValue),
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

  // Gráfico de distribución de tipos de movimiento
  const movementsChartData = {
    labels: ['Entradas', 'Salidas'],
    datasets: [{
      data: [entradasCount, salidasCount],
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

  // Gráfico de productos más valiosos
  const topProductsData = {
    labels: topProducts.map(p => p.name.substring(0, 20)),
    datasets: [{
      label: 'Valor Total ($)',
      data: topProducts.map(p => (p.price * p.stock).toFixed(2)),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  }

  const handleExportReport = () => {
    const reportData = {
      fecha: new Date().toLocaleString('es-ES'),
      resumen: {
        totalProductos,
        totalStock,
        valorInventario: totalValue,
        costoTotal: totalCost,
        margenGanancia: `${profitMargin.toFixed(2)}%`,
        productosStockBajo: lowStockProducts
      },
      productosMasValiosos: topProducts.map(p => ({
        nombre: p.name,
        sku: p.sku,
        valor: (p.price * p.stock).toFixed(2)
      }))
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reporte-inventario-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="wrapper">
      <nav className="navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="fas fa-arrow-left me-2"></i>Volver al Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1>Reportes y Análisis</h1>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            {/* Filtros de fecha */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="row align-items-end">
                  <div className="col-md-4">
                    <label className="form-label">Fecha Inicio</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Fecha Fin</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-primary w-100" onClick={handleExportReport}>
                      <i className="fas fa-download me-2"></i>Exportar Reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjetas de resumen */}
            <div className="row">
              <div className="col-md-3">
                <div className="small-box bg-gradient-primary">
                  <div className="inner">
                    <h3>${totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</h3>
                    <p>Valor Inventario</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <span className="small-box-footer">Total en venta</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="small-box bg-gradient-success">
                  <div className="inner">
                    <h3>{profitMargin.toFixed(2)}%</h3>
                    <p>Margen Ganancia</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-percent"></i>
                  </div>
                  <span className="small-box-footer">Promedio del inventario</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="small-box bg-gradient-warning">
                  <div className="inner">
                    <h3>{lowStockProducts}</h3>
                    <p>Stock Bajo</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <span className="small-box-footer">Productos críticos</span>
                </div>
              </div>

              <div className="col-md-3">
                <div className="small-box bg-gradient-info">
                  <div className="inner">
                    <h3>{movements.length}</h3>
                    <p>Total Movimientos</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-exchange-alt"></i>
                  </div>
                  <span className="small-box-footer">Entradas y salidas</span>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Valor del Inventario por Categoría</h3>
                  </div>
                  <div className="card-body">
                    <div className="chart-container">
                      <Bar data={categoryChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Distribución de Movimientos</h3>
                  </div>
                  <div className="card-body">
                    <div className="chart-container">
                      <Pie data={movementsChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Top 5 Productos Más Valiosos</h3>
                  </div>
                  <div className="card-body">
                    <div className="chart-container" style={{ height: '250px' }}>
                      <Bar 
                        data={topProductsData} 
                        options={{ 
                          responsive: true, 
                          maintainAspectRatio: false,
                          indexAxis: 'y'
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de productos con stock bajo */}
            {lowStockList.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="card border-danger">
                    <div className="card-header bg-danger text-white">
                      <h3 className="card-title">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Productos con Stock Crítico
                      </h3>
                    </div>
                    <div className="card-body p-0">
                      <table className="table table-striped mb-0">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>SKU</th>
                            <th>Stock Actual</th>
                            <th>Stock Mínimo</th>
                            <th>Diferencia</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lowStockList.map(product => (
                            <tr key={product.id}>
                              <td><strong>{product.name}</strong></td>
                              <td>{product.sku}</td>
                              <td className="text-danger fw-bold">{product.stock}</td>
                              <td>{product.minStock}</td>
                              <td className="text-danger">-{product.minStock - product.stock}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Reports
