import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  sku: Yup.string().required('SKU requerido'),
  category: Yup.string().required('Categoría requerida'),
  price: Yup.number().min(0).required('Precio requerido'),
  cost: Yup.number().min(0).required('Costo requerido'),
  stock: Yup.number().min(0).required('Stock requerido'),
  minStock: Yup.number().min(0).required('Stock mínimo requerido'),
  description: Yup.string(),
});

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop HP ProBook', sku: 'HP-001', category: 'Electrónica', price: 899.99, cost: 650.00, stock: 25, minStock: 10 },
    { id: 2, name: 'Mouse Logitech MX', sku: 'LOG-002', category: 'Accesorios', price: 79.99, cost: 45.00, stock: 50, minStock: 20 },
    { id: 3, name: 'Teclado Mecánico RGB', sku: 'KEY-003', category: 'Accesorios', price: 129.99, cost: 75.00, stock: 30, minStock: 15 },
    { id: 4, name: 'Monitor Dell 24"', sku: 'DEL-004', category: 'Electrónica', price: 299.99, cost: 200.00, stock: 15, minStock: 8 },
    { id: 5, name: 'Webcam HD 1080p', sku: 'WEB-005', category: 'Accesorios', price: 89.99, cost: 50.00, stock: 40, minStock: 15 },
  ]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      setProducts(products.filter(p => p.id !== id));
      Swal.fire('Eliminado', 'El producto ha sido eliminado', 'success');
    }
  };

  const handleAddProduct = async (values, { resetForm }) => {
    const newProduct = {
      id: Date.now(),
      ...values,
    };
    setProducts([...products, newProduct]);
    setShowModal(false);
    resetForm();
    Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Productos</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Inicio</a></li>
                <li className="breadcrumb-item active">Productos</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Listado de Productos</h3>
              <div className="card-tools">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fas fa-plus mr-2"></i>
                  Nuevo Producto
                </button>
              </div>
            </div>
            
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar producto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>SKU</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Costo</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Mínimo</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td><code>{product.sku}</code></td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.cost.toFixed(2)}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>
                          <span className={`badge badge-${product.stock <= product.minStock ? 'danger' : 'success'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td>{product.minStock}</td>
                        <td>
                          {product.stock <= product.minStock ? (
                            <span className="badge badge-danger">Bajo Stock</span>
                          ) : (
                            <span className="badge badge-success">Disponible</span>
                          )}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info mr-1">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(product.id)}
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
            
            <div className="card-footer clearfix">
              <div className="float-left">
                Mostrando {filteredProducts.length} de {products.length} productos
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

      {/* Modal para agregar producto */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h5 className="modal-title">Nuevo Producto</h5>
                <button type="button" className="close text-white" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              
              <Formik
                initialValues={{
                  name: '',
                  sku: '',
                  category: '',
                  price: '',
                  cost: '',
                  stock: '',
                  minStock: '',
                  description: '',
                }}
                validationSchema={ProductSchema}
                onSubmit={handleAddProduct}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Nombre *</label>
                            <Field
                              type="text"
                              name="name"
                              className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                              placeholder="Nombre del producto"
                            />
                            {touched.name && errors.name && (
                              <div className="invalid-feedback">{errors.name}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>SKU *</label>
                            <Field
                              type="text"
                              name="sku"
                              className={`form-control ${touched.sku && errors.sku ? 'is-invalid' : ''}`}
                              placeholder="Código SKU"
                            />
                            {touched.sku && errors.sku && (
                              <div className="invalid-feedback">{errors.sku}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Categoría *</label>
                            <Field
                              type="text"
                              name="category"
                              className={`form-control ${touched.category && errors.category ? 'is-invalid' : ''}`}
                              placeholder="Categoría"
                            />
                            {touched.category && errors.category && (
                              <div className="invalid-feedback">{errors.category}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Descripción</label>
                            <Field
                              as="textarea"
                              name="description"
                              className="form-control"
                              rows="3"
                              placeholder="Descripción del producto"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Costo *</label>
                            <Field
                              type="number"
                              step="0.01"
                              name="cost"
                              className={`form-control ${touched.cost && errors.cost ? 'is-invalid' : ''}`}
                              placeholder="0.00"
                            />
                            {touched.cost && errors.cost && (
                              <div className="invalid-feedback">{errors.cost}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Precio Venta *</label>
                            <Field
                              type="number"
                              step="0.01"
                              name="price"
                              className={`form-control ${touched.price && errors.price ? 'is-invalid' : ''}`}
                              placeholder="0.00"
                            />
                            {touched.price && errors.price && (
                              <div className="invalid-feedback">{errors.price}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-4">
                          <div className="form-group">
                            <label>Margen</label>
                            <input
                              type="text"
                              className="form-control"
                              readOnly
                              placeholder="Calculado automáticamente"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Stock Actual *</label>
                            <Field
                              type="number"
                              name="stock"
                              className={`form-control ${touched.stock && errors.stock ? 'is-invalid' : ''}`}
                              placeholder="0"
                            />
                            {touched.stock && errors.stock && (
                              <div className="invalid-feedback">{errors.stock}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Stock Mínimo *</label>
                            <Field
                              type="number"
                              name="minStock"
                              className={`form-control ${touched.minStock && errors.minStock ? 'is-invalid' : ''}`}
                              placeholder="0"
                            />
                            {touched.minStock && errors.minStock && (
                              <div className="invalid-feedback">{errors.minStock}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="modal-footer justify-content-between">
                      <button type="button" className="btn btn-default" onClick={() => setShowModal(false)}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save mr-2"></i>
                        Guardar Producto
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
