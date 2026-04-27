import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchMovements, addMovement } from '../store/slices/movementsSlice'
import { fetchProducts } from '../store/slices/productsSlice'
import Swal from 'sweetalert2'

const Movements = () => {
  const dispatch = useDispatch()
  const { items: movements } = useSelector((state) => state.movements)
  const { items: products } = useSelector((state) => state.products)
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    productId: '',
    type: 'entrada',
    quantity: '',
    notes: ''
  })

  useEffect(() => {
    dispatch(fetchMovements())
    dispatch(fetchProducts())
  }, [dispatch])

  const handleOpenModal = () => {
    setFormData({
      productId: '',
      type: 'entrada',
      quantity: '',
      notes: ''
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const product = products.find(p => p.id === parseInt(formData.productId))
    if (!product) {
      Swal.fire('Error', 'Producto no encontrado', 'error')
      return
    }

    const movementData = {
      productId: parseInt(formData.productId),
      productName: product.name,
      type: formData.type,
      quantity: parseInt(formData.quantity),
      notes: formData.notes,
      user: 'admin'
    }

    try {
      await dispatch(addMovement(movementData)).unwrap()
      Swal.fire('Éxito', 'Movimiento registrado correctamente', 'success')
      handleCloseModal()
    } catch (error) {
      Swal.fire('Error', 'No se pudo registrar el movimiento', 'error')
    }
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
            <h1>Movimientos de Inventario</h1>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-12">
                <button className="btn btn-primary" onClick={handleOpenModal}>
                  <i className="fas fa-plus me-2"></i>Nuevo Movimiento
                </button>
              </div>
            </div>

            <div className="card">
              <div className="card-body p-0">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Producto</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                      <th>Usuario</th>
                      <th>Notas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.map(movement => (
                      <tr key={movement.id}>
                        <td>{new Date(movement.date).toLocaleString('es-ES')}</td>
                        <td><strong>{movement.productName}</strong></td>
                        <td>
                          <span className={`badge ${movement.type === 'entrada' ? 'bg-success' : 'bg-danger'}`}>
                            {movement.type === 'entrada' ? 'Entrada' : 'Salida'}
                          </span>
                        </td>
                        <td>{movement.quantity}</td>
                        <td>{movement.user}</td>
                        <td>{movement.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Movimiento</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tipo de Movimiento *</label>
                    <select
                      className="form-select"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="entrada">Entrada (Compra/Devolución)</option>
                      <option value="salida">Salida (Venta/Merma)</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Producto *</label>
                    <select
                      className="form-select"
                      required
                      value={formData.productId}
                      onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                    >
                      <option value="">Seleccionar producto</option>
                      {products.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} - Stock: {product.stock}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cantidad *</label>
                    <input
                      type="number"
                      className="form-control"
                      required
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Notas</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">Registrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Movements
