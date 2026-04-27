import React from 'react';

const Settings = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Configuración</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Configuración</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Configuración General</h3>
                </div>
                <form>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Nombre de la Empresa</label>
                      <input type="text" className="form-control" placeholder="Nombre de la empresa" />
                    </div>
                    <div className="form-group">
                      <label>Email de Contacto</label>
                      <input type="email" className="form-control" placeholder="email@empresa.com" />
                    </div>
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input type="text" className="form-control" placeholder="+1 234 567 890" />
                    </div>
                    <div className="form-group">
                      <label>Dirección</label>
                      <textarea className="form-control" rows="3" placeholder="Dirección completa"></textarea>
                    </div>
                    <div className="form-group">
                      <label>Moneda</label>
                      <select className="form-control">
                        <option>USD - Dólar Americano</option>
                        <option>EUR - Euro</option>
                        <option>MXN - Peso Mexicano</option>
                        <option>COP - Peso Colombiano</option>
                        <option>ARS - Peso Argentino</option>
                      </select>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card card-info">
                <div className="card-header">
                  <h3 className="card-title">Preferencias del Sistema</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="notifications" defaultChecked />
                      <label className="custom-control-label" htmlFor="notifications">Notificaciones por Email</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="alerts" defaultChecked />
                      <label className="custom-control-label" htmlFor="alerts">Alertas de Stock Bajo</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-switch">
                      <input type="checkbox" className="custom-control-input" id="darkmode" />
                      <label className="custom-control-label" htmlFor="darkmode">Modo Oscuro</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Stock Mínimo por Defecto</label>
                    <input type="number" className="form-control" defaultValue="10" />
                  </div>
                  <div className="form-group">
                    <label>Idioma</label>
                    <select className="form-control">
                      <option>Español</option>
                      <option>English</option>
                      <option>Português</option>
                    </select>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-info">Guardar Preferencias</button>
                </div>
              </div>

              <div className="card card-danger">
                <div className="card-header">
                  <h3 className="card-title">Zona de Peligro</h3>
                </div>
                <div className="card-body">
                  <p className="text-muted">Estas acciones son irreversibles. Por favor, tenga cuidado.</p>
                  <button className="btn btn-outline-danger mr-2">
                    <i className="fas fa-database mr-2"></i>
                    Exportar Datos
                  </button>
                  <button className="btn btn-outline-warning">
                    <i className="fas fa-trash-alt mr-2"></i>
                    Limpiar Caché
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;
