import React from 'react';

const Reports = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Reportes</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Reportes</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="info-box">
                <span className="info-box-icon bg-info elevation-1">
                  <i className="fas fa-file-alt"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Valor Inventario</span>
                  <span className="info-box-number">$45,230</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-danger elevation-1">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Stock Bajo</span>
                  <span className="info-box-number">12 productos</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-success elevation-1">
                  <i className="fas fa-arrow-up"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Entradas (Mes)</span>
                  <span className="info-box-number">245</span>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="info-box mb-3">
                <span className="info-box-icon bg-warning elevation-1">
                  <i className="fas fa-arrow-down"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Salidas (Mes)</span>
                  <span className="info-box-number">187</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Generar Reportes</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <button className="btn btn-app bg-primary w-100 mb-3">
                        <i className="fas fa-file-pdf"></i>
                        Reporte de Inventario
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-app bg-success w-100 mb-3">
                        <i className="fas fa-file-excel"></i>
                        Movimientos del Mes
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-app bg-warning w-100 mb-3">
                        <i className="fas fa-chart-bar"></i>
                        Análisis de Ventas
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-app bg-info w-100 mb-3">
                        <i className="fas fa-boxes"></i>
                        Productos por Categoría
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-app bg-danger w-100 mb-3">
                        <i className="fas fa-exclamation-circle"></i>
                        Stock Crítico
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-app bg-secondary w-100 mb-3">
                        <i className="fas fa-history"></i>
                        Historial Completo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reports;
