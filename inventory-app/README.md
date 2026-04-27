# Inventory Pro - Sistema de Gestión de Inventarios

Aplicación React moderna para gestión de inventarios con costos, basada en AdminLTE 3.

## 🚀 Características

- **Autenticación**: Login seguro con validación
- **Dashboard**: Panel de control con gráficas y estadísticas
- **Gestión de Productos**: CRUD completo con costos y precios
- **Categorías**: Organización de productos por categorías
- **Movimientos**: Registro de entradas, salidas y ajustes
- **Reportes**: Generación de reportes e informes
- **Usuarios**: Gestión de usuarios y permisos
- **Configuración**: Ajustes del sistema

## 🛠️ Tecnologías Utilizadas

- **React 19** - Framework UI
- **Vite** - Build tool moderno
- **Redux Toolkit** - Manejo de estado
- **React Router v6** - Navegación
- **Formik + Yup** - Formularios y validación
- **Chart.js** - Gráficas y visualización
- **SweetAlert2** - Alertas modernas
- **AdminLTE 3** - Plantilla administrativa
- **Bootstrap 4** - Estilos responsive
- **Font Awesome** - Iconos

## 📦 Instalación

```bash
# Clonar el repositorio
cd inventory-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 🔐 Credenciales Demo

- **Email**: admin@admin.com
- **Password**: admin123

## 📁 Estructura del Proyecto

```
inventory-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Categories.jsx
│   │   ├── Movements.jsx
│   │   ├── Reports.jsx
│   │   ├── Users.jsx
│   │   └── Settings.jsx
│   ├── store/
│   │   ├── index.js
│   │   ├── authSlice.js
│   │   └── inventorySlice.js
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   └── useRedux.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Vistas Incluidas

1. **Login**: Página de autenticación con diseño moderno
2. **Dashboard**: Métricas, gráficas y tablas resumen
3. **Productos**: Listado, búsqueda, creación y edición
4. **Categorías**: Gestión de categorías de productos
5. **Movimientos**: Historial de entradas y salidas
6. **Reportes**: Botones para generar diferentes reportes
7. **Usuarios**: Administración de usuarios del sistema
8. **Configuración**: Ajustes generales y preferencias

## 🔌 API (Simulada)

La aplicación incluye una capa de servicios lista para conectar con un backend real. Los datos actuales están mockeados para demostración.

Para conectar con una API real, editar `src/services/api.js` con la URL de tu backend.

## 📝 Notas

- La aplicación usa datos de ejemplo para demostración
- El login es simulado con credenciales hardcodeadas
- Para producción, implementar autenticación JWT real
- Conectar con backend para persistencia de datos

## 👨‍💻 Autor

Desarrollado como demo de aplicación de inventarios moderna.

## 📄 Licencia

MIT License
