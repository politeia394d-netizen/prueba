import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, addProduct, updateProduct, deleteProduct, setFilters } from '../store/slices/productsSlice'
import { fetchCategories } from '../store/slices/categoriesSlice'
import Swal from 'sweetalert2'

const Products = () => {
  const dispatch = useDispatch()
  const { items: products, loading, filters } = useSelector((state) => state.products)
  const { items: categories } = useSelector((state) => state.categories)
  
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    cost: '',
    stock: '',
    minStock: '',
    description: ''
  })

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  const filteredProducts = products.filter(product => {
    const matchSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.sku.toLowerCase().includes(filters.search.toLowerCase())
    
    const matchCategory = !filters.category || product.category === filters.category
    
    const matchLowStock = !filters.lowStock || (product.stock || 0) <= (product.minStock || 5)
    
    return matchSearch && matchCategory && matchLowStock
  })

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.toString(),
        cost: product.cost.toString(),
        stock: product.stock.toString(),
        minStock: product.minStock.toString(),
        description: product.description || ''
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        sku: '',
        category: categories[0]?.name || '',
        price: '',
        cost: '',
        stock: '',
        minStock: '5',
        description: ''
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      cost: parseFloat(formData.cost),
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock)
    }

    try {
      if (editingProduct) {
        await dispatch(updateProduct({ id: editingProduct.id, ...productData })).unwrap()
        Swal.fire('Éxito', 'Producto actualizado correctamente', 'success')
      } else {
        await dispatch(addProduct(productData)).unwrap()
        Swal.fire('Éxito', 'Producto creado correctamente', 'success')
      }
      handleCloseModal()
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el producto', 'error')
    }
  }

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se eliminará el producto "${name}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        await dispatch(deleteProduct(id)).unwrap()
        Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success')
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error')
      }
    }
  }

  return (
    <div className="wrapper">
      {/* Navbar simplificada */}
      <nav className="navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <i className="fas fa-arrow-left me-2"></i>Volver al Dashboard
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1>Gestión de Productos</h1>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            {/* Filtros */}
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por nombre o SKU..."
                      value={filters.search}
                      onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      value={filters.category}
                      onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
                    >
                      <option value="">Todas las categorías</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="lowStock"
                        checked={filters.lowStock}
                        onChange={(e) => dispatch(setFilters({ lowStock: e.target.checked }))}
                      />
                      <label className="form-check-label" htmlFor="lowStock">
                        Solo stock bajo
                      </label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={() => handleOpenModal()}>
                      <i className="fas fa-plus me-2"></i>Nuevo Producto
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de productos */}
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Costo</th>
                        <th>Stock</th>
                        <th>Mínimo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(product => (
                        <tr key={product.id} className={product.stock <= product.minStock ? 'table-warning' : ''}>
                          <td><strong>{product.sku}</strong></td>
                          <td>{product.name}</td>
                          <td>
                            <span className="badge bg-info">{product.category}</span>
                          </td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>${product.cost.toFixed(2)}</td>
                          <td>
                            <span className={product.stock <= product.minStock ? 'text-danger fw-bold' : ''}>
                              {product.stock}
                            </span>
                          </td>
                          <td>{product.minStock}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-info me-1"
                              onClick={() => handleOpenModal(product)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(product.id, product.name)}
                            >
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

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">SKU *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Categoría *</label>
                      <select
                        className="form-select"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="">Seleccionar</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Descripción</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Precio Venta *</label>
                      <input
                        type="number"
                        className="form-control"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Costo *</label>
                      <input
                        type="number"
                        className="form-control"
                        step="0.01"
                        required
                        value={formData.cost}
                        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Stock Actual *</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Stock Mínimo *</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        value={formData.minStock}
                        onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
