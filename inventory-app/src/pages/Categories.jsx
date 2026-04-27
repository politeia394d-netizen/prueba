import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories, addCategory, deleteCategory } from '../store/slices/categoriesSlice'
import Swal from 'sweetalert2'

const Categories = () => {
  const dispatch = useDispatch()
  const { items: categories, loading } = useSelector((state) => state.categories)
  
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleOpenModal = () => {
    setFormData({ name: '', description: '' })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await dispatch(addCategory(formData)).unwrap()
      Swal.fire('Éxito', 'Categoría creada correctamente', 'success')
      handleCloseModal()
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la categoría', 'error')
    }
  }

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará la categoría "${name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await dispatch(deleteCategory(id)).unwrap()
        Swal.fire('Eliminado', 'La categoría ha sido eliminada', 'success')
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la categoría', 'error')
      }
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
            <h1>Gestión de Categorías</h1>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                      <i className="fas fa-plus me-2"></i>Nueva Categoría
                    </button>
                  </div>
                  <div className="card-body p-0">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Descripción</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(category => (
                          <tr key={category.id}>
                            <td>{category.id}</td>
                            <td><strong>{category.name}</strong></td>
                            <td>{category.description}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(category.id, category.name)}
                              >
                                <i className="fas fa-trash"></i> Eliminar
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
          </div>
        </section>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nueva Categoría</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
