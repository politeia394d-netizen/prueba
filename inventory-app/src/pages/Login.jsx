import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      dispatch(loginStart());
      setLoading(true);

      // Simulación de login - en producción usarías la API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Login demo con credenciales hardcodeadas
      if (values.email === 'admin@admin.com' && values.password === 'admin123') {
        const userData = {
          id: 1,
          name: 'Administrador',
          email: values.email,
          role: 'admin',
        };
        
        dispatch(loginSuccess({
          user: userData,
          token: 'demo-token-' + Date.now(),
        }));
        
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente',
          timer: 1500,
          showConfirmButton: false,
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      setErrors({ submit: error.message });
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="hold-transition login-page bg-dark">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1 className="h4">
              <i className="fas fa-boxes me-2"></i>
              <strong>Inventory</strong> Pro
            </h1>
          </div>
          <div className="card-body">
            <p className="login-box-msg text-muted">Inicia sesión para continuar</p>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="input-group mb-3">
                    <Field
                      type="email"
                      name="email"
                      className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                      disabled={loading}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope"></span>
                      </div>
                    </div>
                    {touched.email && errors.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  
                  <div className="input-group mb-3">
                    <Field
                      type="password"
                      name="password"
                      className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                      placeholder="Contraseña"
                      disabled={loading}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock"></span>
                      </div>
                    </div>
                    {touched.password && errors.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  
                  <div className="row">
                    <div className="col-8">
                      <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Recuérdame</label>
                      </div>
                    </div>
                    <div className="col-4">
                      <button 
                        type="submit" 
                        className="btn btn-primary btn-block w-100"
                        disabled={loading || isSubmitting}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Entrando...
                          </>
                        ) : (
                          'Entrar'
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="text-center mt-3">
              <p className="mb-0 text-muted small">
                Demo: admin@admin.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
