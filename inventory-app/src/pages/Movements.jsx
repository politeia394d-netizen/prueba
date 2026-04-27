import React from 'react';

const Movements = () => {
  const movements = [
    { id: 1, product: 'Laptop HP ProBook', type: 'entrada', quantity: 10, date: '2024-01-15', user: 'Admin', reason: 'Compra a proveedor' },
    { id: 2, product: 'Mouse Logitech MX', type: 'salida', quantity: 25, date: '2024-01-15', user: 'Juan Pérez', reason: 'Venta' },
    { id: 3, product: 'Teclado Mecánico RGB', type: 'entrada', quantity: 15, date: '2024-01-14', user: 'Admin', reason: 'Compra a proveedor' },
    { id: 4, product: 'Monitor Dell 24"', type: 'salida', quantity: 5, date: '2024-01-14', user: 'María García', reason: 'Venta' },
    { id: 5, product: 'Webcam HD 1080p', type: 'entrada', quantity: 20, date: '2024-01-13', user: 'Admin', reason: 'Devolución' },
    { id: 6, product: 'Cable USB-C', type: 'ajuste', quantity: -3, date: '2024-01-13', user: 'Admin', reason: 'Inventario físico' },
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Movimientos de Inventario</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Movimientos</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Historial de Movimientos</h3>
              <div className="card-tools">
                <button className="btn btn-success mr-2">
                  <i className="fas fa-arrow-down mr-2"></i>
                  Entrada
                </button>
                <button className="btn btn-danger mr-2">
                  <i className="fas fa-arrow-up mr-2"></i>
                  Salida
                </button>
                <button className="btn btn-warning">
                  <i className="fas fa-exchange-alt mr-2"></i>
                  Ajuste
                </button>
              </div>
            </div>
            
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Producto</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                      <th>Razón</th>
                      <th>Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map((movement) => (
                      <tr key={movement.id}>
                        <td>{movement.id}</td>
                        <td>{new Date(movement.date).toLocaleDateString()}</td>
                        <td>{movement.product}</td>
                        <td>
                          <span className={`badge badge-${
                            movement.type === 'entrada' ? 'success' : 
                            movement.type === 'salida' ? 'danger' : 'warning'
                          }`}>
                            {movement.type}
                          </span>
                        </td>
                        <td className={movement.quantity > 0 ? 'text-success' : 'text-danger'}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </td>
                        <td>{movement.reason}</td>
                        <td>{movement.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="card-footer clearfix">
              <div className="float-left">
                Mostrando {movements.length} movimientos
              </div>
              <div className="float-right">
                <nav>
                  <ul className="pagination pagination-sm m-0">
                    <li className="page-item disabled"><a className="page-link" href="#">&laquo;</a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">&raquo;</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Movements;
