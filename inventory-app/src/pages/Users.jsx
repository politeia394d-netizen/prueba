import React from 'react';

const Users = () => {
  const users = [
    { id: 1, name: 'Administrador', email: 'admin@admin.com', role: 'Admin', status: 'Activo', lastLogin: '2024-01-15' },
    { id: 2, name: 'Juan Pérez', email: 'juan@empresa.com', role: 'Usuario', status: 'Activo', lastLogin: '2024-01-14' },
    { id: 3, name: 'María García', email: 'maria@empresa.com', role: 'Usuario', status: 'Activo', lastLogin: '2024-01-13' },
    { id: 4, name: 'Carlos López', email: 'carlos@empresa.com', role: 'Supervisor', status: 'Inactivo', lastLogin: '2024-01-10' },
  ];

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Usuarios</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Usuarios</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Gestión de Usuarios</h3>
              <div className="card-tools">
                <button className="btn btn-primary">
                  <i className="fas fa-user-plus mr-2"></i>
                  Nuevo Usuario
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
                      <th>Email</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Último Acceso</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="fas fa-user-circle fa-2x mr-2 text-gray"></i>
                            <strong>{user.name}</strong>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge badge-${user.role === 'Admin' ? 'danger' : user.role === 'Supervisor' ? 'info' : 'secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {user.status === 'Activo' ? (
                            <span className="badge badge-success">{user.status}</span>
                          ) : (
                            <span className="badge badge-secondary">{user.status}</span>
                          )}
                        </td>
                        <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
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

export default Users;
