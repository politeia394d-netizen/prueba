import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard" className="brand-link">
        <i className="fas fa-boxes brand-image img-circle elevation-3 mx-2" style={{ opacity: .8 }}></i>
        <span className="brand-text font-weight-light">Inventory Pro</span>
      </Link>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <i className="fas fa-user-circle fa-2x text-white"></i>
          </div>
          <div className="info">
            <a href="#" className="d-block">Administrador</a>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
            <li className={`nav-item ${isActive('/dashboard')}`}>
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive('/products')}`}>
              <Link to="/products" className="nav-link">
                <i className="nav-icon fas fa-box"></i>
                <p>Productos</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive('/categories')}`}>
              <Link to="/categories" className="nav-link">
                <i className="nav-icon fas fa-tags"></i>
                <p>Categorías</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive('/movements')}`}>
              <Link to="/movements" className="nav-link">
                <i className="nav-icon fas fa-exchange-alt"></i>
                <p>Movimientos</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive('/reports')}`}>
              <Link to="/reports" className="nav-link">
                <i className="nav-icon fas fa-chart-line"></i>
                <p>Reportes</p>
              </Link>
            </li>

            <li className="nav-header">CONFIGURACIÓN</li>
            
            <li className={`nav-item ${isActive('/users')}`}>
              <Link to="/users" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Usuarios</p>
              </Link>
            </li>

            <li className={`nav-item ${isActive('/settings')}`}>
              <Link to="/settings" className="nav-link">
                <i className="nav-icon fas fa-cogs"></i>
                <p>Ajustes</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
