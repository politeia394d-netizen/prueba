# Sistema de Gestión de Inventarios - InventarioPro

Aplicación React moderna para gestión integral de inventarios con costos, desarrollada con Vite, Redux Toolkit, AdminLTE 3, y Chart.js.

## 🚀 Características Principales

- **Autenticación JWT**: Login seguro con protección de rutas
- **Dashboard Interactivo**: 
  - Tarjetas de estadísticas en tiempo real
  - Gráficos de productos por categoría
  - Distribución de stock
  - Alertas de stock bajo
  - Últimos movimientos
- **Gestión de Productos (CRUD)**:
  - Nombre, SKU, categoría
  - Precio de venta y costo
  - Control de stock y stock mínimo
  - Filtros avanzados (búsqueda, categoría, stock bajo)
- **Gestión de Categorías**: Crear y eliminar categorías
- **Movimientos de Inventario**:
  - Registro de entradas y salidas
  - Historial completo de movimientos
- **Reportes y Análisis**:
  - Valor total del inventario
  - Margen de ganancia
  - Productos más valiosos
  - Exportación de reportes en JSON
  - Gráficos avanzados

## 📦 Tecnologías Utilizadas

- **React 19** - Framework UI
- **Vite 8** - Build tool ultra-rápido
- **Redux Toolkit** - Gestión de estado
- **React Router 7** - Navegación
- **AdminLTE 4** - Template administrativo moderno
- **Bootstrap 5** - Estilos responsive
- **Chart.js 4** - Gráficos estadísticos
- **SweetAlert2** - Alertas modernas
- **Font Awesome** - Iconos

## 🛠️ Instalación Local

```bash
# Clonar o copiar el proyecto
cd inventory-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🌐 Despliegue en Hostinger

### Opción 1: Subir archivos compilados (Recomendado)

1. **Compilar el proyecto**:
   ```bash
   npm run build
   ```

2. **Subir archivos a Hostinger**:
   - Acceder al Administrador de Archivos de Hostinger
   - Navegar a `public_html`
   - Subir todo el contenido de la carpeta `dist/`

3. **Configurar redirección SPA** (importante para React Router):
   - Crear archivo `.htaccess` en `public_html`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Opción 2: Usar Node.js en Hostinger (si está disponible)

1. En el panel de Hostinger, ir a **Node.js**
2. Crear nueva aplicación Node.js
3. Seleccionar versión Node.js 18+
4. Configurar directorio de la aplicación
5. Ejecutar `npm install` y `npm run build`
6. Configurar dominio/subdominio

## 📁 Estructura del Proyecto

```
inventory-app/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas principales
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Products.jsx
│   │   ├── Categories.jsx
│   │   ├── Movements.jsx
│   │   └── Reports.jsx
│   ├── store/            # Redux Store
│   │   ├── store.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── productsSlice.js
│   │       ├── categoriesSlice.js
│   │       └── movementsSlice.js
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 Credenciales de Demo

- **Email**: admin@inventario.com
- **Contraseña**: admin123

## 💾 Persistencia de Datos

Actualmente la aplicación usa **localStorage** para persistencia de datos. Para producción, se recomienda implementar:

1. **Backend API** (Node.js/Express, Laravel, etc.)
2. **Base de datos** (MySQL, PostgreSQL, MongoDB)
3. **Autenticación JWT real**
4. **Endpoints RESTful** para:
   - `POST /api/auth/login`
   - `GET /api/products`
   - `POST /api/products`
   - `PUT /api/products/:id`
   - `DELETE /api/products/:id`
   - `GET /api/categories`
   - `POST /api/movements`
   - `GET /api/reports`

## 🎨 Personalización

### Cambiar colores del tema
Editar `src/index.css` y modificar las clases `.bg-gradient-*`

### Agregar nuevas páginas
1. Crear componente en `src/pages/`
2. Agregar ruta en `src/App.jsx`
3. Agregar enlace en el sidebar del Dashboard

### Modificar dashboard
Editar `src/pages/Dashboard.jsx` para cambiar gráficos y estadísticas

## 📊 Funcionalidades Destacadas

### Alertas de Stock Bajo
El sistema detecta automáticamente productos con stock por debajo del mínimo y muestra:
- Notificación en dashboard
- Tarjeta de estadísticas
- Tabla de productos críticos en reportes

### Cálculo de Márgenes
- Valor total del inventario (precio × stock)
- Costo total (costo × stock)
- Margen de ganancia porcentual

### Gráficos Interactivos
- Barras: Productos por categoría
- Doughnut: Distribución de stock
- Pie: Movimientos por tipo
- Barras horizontales: Top productos

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (puerto 3000)
npm run build    # Compilar para producción
npm run preview  # Vista previa de build
```

## 📱 Responsive Design

La aplicación es completamente responsive y se adapta a:
- Desktop (≥1024px)
- Tablet (768px - 1023px)
- Mobile (<768px)

## 🤝 Soporte

Para problemas o sugerencias, revisar la documentación de:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [AdminLTE](https://adminlte.io/)

---

**Desarrollado con ❤️ usando React + Vite + AdminLTE**
