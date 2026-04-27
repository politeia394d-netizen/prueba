import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      {children}
      <footer className="main-footer">
        <div className="float-right d-none d-sm-block">
          <b>Versión</b> 1.0.0
        </div>
        <strong>Inventory Pro</strong> - Sistema de Gestión de Inventarios
      </footer>
    </div>
  );
};

export default Layout;
