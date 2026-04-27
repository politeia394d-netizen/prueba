import React from 'react';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Electrónica', description: 'Dispositivos y equipos electrónicos', products: 156, active: true },
    { id: 2, name: 'Accesorios', description: 'Accesorios para computadoras', products: 243, active: true },
    { id: 3, name: 'Ropa', description: 'Prendas de vestir', products: 89, active: true },
    { id: 4, name: 'Hogar', description: 'Artículos para el hogar', products: 67, active: true },
    { id: 5, name: 'Deportes', description: 'Equipamiento deportivo', products: 45, active: false },
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Categorías</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Categorías</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Listado de Categorías</h3>
              <div className="card-tools">
                <button className="btn btn-primary">
                  <i className="fas fa-plus mr-2"></i>
                  Nueva Categoría
                </button>
              </div>
            </div>
            
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Productos</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td>{category.id}</td>
                        <td><strong>{category.name}</strong></td>
                        <td>{category.description}</td>
                        <td>
                          <span className="badge badge-info">{category.products}</span>
                        </td>
                        <td>
                          {category.active ? (
                            <span className="badge badge-success">Activo</span>
                          ) : (
                            <span className="badge badge-secondary">Inactivo</span>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info mr-1">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-danger">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
