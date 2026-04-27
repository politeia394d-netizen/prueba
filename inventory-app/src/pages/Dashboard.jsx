import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement);

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Datos de ejemplo para el dashboard
  const statsCards = [
    { title: 'Productos Totales', value: 1250, icon: 'fa-box', color: 'bg-primary', change: '+12%' },
    { title: 'Categorías', value: 45, icon: 'fa-tags', color: 'bg-success', change: '+3%' },
    { title: 'Movimientos (Mes)', value: 387, icon: 'fa-exchange-alt', color: 'bg-warning', change: '+18%' },
    { title: 'Valor Inventario', value: '$45,230', icon: 'fa-dollar-sign', color: 'bg-info', change: '+8%' },
  ];

  const barChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Entradas',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Salidas',
        data: [28, 48, 40, 19, 86, 27],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas Semanales',
        data: [12, 19, 3, 5, 2, 3, 15],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Electrónica', 'Ropa', 'Hogar', 'Deportes'],
    datasets: [
      {
        data: [300, 150, 100, 80],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const recentMovements = [
    { id: 1, product: 'Laptop HP ProBook', type: 'entrada', quantity: 10, date: '2024-01-15', user: 'Admin' },
    { id: 2, product: 'Mouse Logitech', type: 'salida', quantity: 25, date: '2024-01-15', user: 'Juan Pérez' },
    { id: 3, product: 'Teclado Mecánico', type: 'entrada', quantity: 15, date: '2024-01-14', user: 'Admin' },
    { id: 4, product: 'Monitor Dell 24"', type: 'salida', quantity: 5, date: '2024-01-14', user: 'María García' },
    { id: 5, product: 'Webcam HD', type: 'entrada', quantity: 20, date: '2024-01-13', user: 'Admin' },
  ];

  const lowStockProducts = [
    { id: 1, name: 'Cable USB-C', stock: 5, minStock: 10, category: 'Accesorios' },
    { id: 2, name: 'Auriculares Bluetooth', stock: 3, minStock: 8, category: 'Audio' },
    { id: 3, name: 'Funda Laptop', stock: 7, minStock: 15, category: 'Accesorios' },
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          {/* Stats Cards */}
          <div className="row">
            {statsCards.map((stat, index) => (
              <div className="col-lg-3 col-6" key={index}>
                <div className="small-box card-widget">
                  <div className={`inner ${stat.color} text-white`}>
                    <h3>{stat.value}</h3>
                    <p>{stat.title}</p>
                  </div>
                  <div className="icon">
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <a href="#" className="small-box-footer">
                    Más info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                  <span className={`small-box-footer ${stat.change.includes('+') ? 'text-success' : 'text-danger'}`}>
                    {stat.change} vs mes anterior
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Movimientos Mensuales</h3>
                  <div className="card-tools">
                    <select 
                      className="form-control form-control-sm"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="week">Semana</option>
                      <option value="month">Mes</option>
                      <option value="year">Año</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <Bar data={barChartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Distribución por Categoría</h3>
                </div>
                <div className="card-body">
                  <Doughnut data={doughnutChartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>

          {/* Second Charts Row */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tendencia de Ventas Semanales</h3>
                </div>
                <div className="card-body">
                  <Line data={lineChartData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tables Row */}
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Últimos Movimientos</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-tool btn-primary btn-sm">
                      <i className="fas fa-plus"></i> Nuevo Movimiento
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cant.</th>
                        <th>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMovements.map((movement) => (
                        <tr key={movement.id}>
                          <td>{movement.product}</td>
                          <td>
                            <span className={`badge badge-${movement.type === 'entrada' ? 'success' : 'danger'}`}>
                              {movement.type}
                            </span>
                          </td>
                          <td>{movement.quantity}</td>
                          <td>{moment(movement.date).format('DD/MM/YYYY')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer clearfix">
                  <a href="#" className="btn btn-sm btn-info float-left">Ver Todos</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Stock Bajo</h3>
                  <span className="badge badge-danger ml-2">{lowStockProducts.length} productos</span>
                </div>
                <div className="card-body p-0">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Stock</th>
                        <th>Mínimo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td className="text-danger font-weight-bold">{product.stock}</td>
                          <td>{product.minStock}</td>
                          <td>
                            <span className="badge badge-danger">Crítico</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer clearfix">
                  <a href="/products" className="btn btn-sm btn-warning float-left">Gestionar Stock</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
