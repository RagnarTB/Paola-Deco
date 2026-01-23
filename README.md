# 🎉 Paola Deco & Eventos

Plataforma web **Full Stack (MERN)** para la gestión y visualización de un catálogo de servicios de decoración de eventos. Sistema completo con panel de administración, autenticación segura, y gestión dinámica de contenido.

---

## 🚀 Tecnologías Utilizadas

### **Frontend (Cliente)**
- **React 19** + **Vite** - Interfaz moderna y reactiva
- **Tailwind CSS** - Diseño responsivo y personalizado con tema de marca
- **React Router DOM v7** - Navegación SPA con rutas protegidas
- **Axios** - Cliente HTTP para consumo de API REST
- **js-cookie** - Manejo de cookies para autenticación
- **React Icons** - Iconografía moderna

### **Backend (Servidor)**
- **Node.js** + **Express 5** - Servidor RESTful API
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM para modelado de datos
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **Cloudinary** - Almacenamiento y gestión de imágenes en la nube
- **Multer** - Manejo de uploads multipart/form-data
- **dotenv** - Gestión de variables de entorno
- **cookie-parser** - Parseo de cookies HTTP

---

## ✨ Funcionalidades Implementadas

### 🌐 **Zona Pública**
- ✅ **Página de Inicio (HomePage)** con carrusel dinámico configurable desde el admin
- ✅ **Catálogo de Servicios** con visualización de todos los servicios disponibles
- ✅ **Página de Detalle** para cada servicio con galería de imágenes
- ✅ **Diseño Responsivo** optimizado para móviles, tablets y escritorio
- ✅ **Navbar y Footer** personalizables con información de contacto dinámica
- ✅ **Integración con WhatsApp** desde el hero y footer

### 🔐 **Sistema de Autenticación**
- ✅ **Registro de Usuarios Admin** con encriptación bcrypt
- ✅ **Login/Logout** con JWT (tokens en cookies httpOnly)
- ✅ **Rutas Protegidas** - Solo usuarios autenticados acceden al panel admin
- ✅ **Context API** para gestión global del estado de autenticación
- ✅ **Persistencia de sesión** mediante cookies seguras

### 🎛️ **Panel de Administración**
- ✅ **Dashboard Admin** con sidebar de navegación
- ✅ **CRUD Completo de Servicios**:
  - Crear servicios con título, categoría, precio, descripción, características
  - Editar servicios existentes
  - Eliminar servicios
  - Marcar servicios como "Populares"
  - **Upload múltiple de imágenes** a Cloudinary
- ✅ **Gestión de Categorías**:
  - Crear, editar y eliminar categorías
  - Generación automática de slugs
  - Validación de nombres únicos
- ✅ **Configuración del Sitio**:
  - Editar nombre del sitio y logo
  - Configurar datos de contacto (WhatsApp, teléfono, email, dirección)
  - Gestionar redes sociales (Facebook, Instagram)
  - **Administrar carrusel del Home** (agregar/editar/eliminar slides con imágenes)

### 🖼️ **Gestión de Imágenes**
- ✅ **Integración con Cloudinary** para almacenamiento en la nube
- ✅ **Upload de imágenes** con vista previa
- ✅ **Eliminación automática** de imágenes al borrar servicios/slides
- ✅ **Optimización** y transformación de imágenes

### 🗄️ **Modelos de Base de Datos**
- ✅ **User** - Usuarios administradores (username, email, password hash)
- ✅ **Service** - Servicios/productos (título, categoría, precio, descripción, imágenes, características, isPopular)
- ✅ **Category** - Categorías de servicios (name, slug)
- ✅ **Config** - Configuración global del sitio (nombre, logo, contacto, redes sociales, slides del hero)

### 🛣️ **API REST Endpoints**

#### Autenticación (`/api/auth`)
- `POST /register` - Registro de admin
- `POST /login` - Inicio de sesión
- `POST /logout` - Cierre de sesión

#### Servicios (`/api/services`)
- `GET /` - Listar todos los servicios
- `GET /:id` - Obtener servicio por ID
- `POST /` - Crear servicio (protegido)
- `PUT /:id` - Actualizar servicio (protegido)
- `DELETE /:id` - Eliminar servicio (protegido)

#### Categorías (`/api/categories`)
- `GET /` - Listar categorías
- `GET /:id` - Obtener categoría por ID
- `POST /` - Crear categoría (protegido)
- `PUT /:id` - Actualizar categoría (protegido)
- `DELETE /:id` - Eliminar categoría (protegido)

#### Configuración (`/api/config`)
- `GET /` - Obtener configuración del sitio
- `PUT /` - Actualizar configuración (protegido)

#### Upload (`/api/upload`)
- `POST /` - Subir imagen a Cloudinary (protegido)
- `DELETE /` - Eliminar imagen de Cloudinary (protegido)

---

## 📁 Estructura del Proyecto

```
paola-deco-project/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── api/              # Servicios de API (Axios)
│   │   ├── components/       # Navbar, Footer, AdminSidebar
│   │   ├── context/          # AuthContext
│   │   ├── layouts/          # PublicLayout, AdminLayout
│   │   ├── pages/            # Páginas de la aplicación
│   │   │   ├── HomePage.jsx
│   │   │   ├── CatalogPage.jsx
│   │   │   ├── ServiceDetailPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── ServiceFormPage.jsx
│   │   │   ├── CategoriesPage.jsx
│   │   │   └── AdminConfigPage.jsx
│   │   ├── App.jsx
│   │   └── ProtectedRoute.jsx
│   └── package.json
│
├── server/                    # Backend Node.js
│   ├── libs/                 # Utilidades (JWT, Cloudinary)
│   ├── models/               # Modelos Mongoose
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Category.js
│   │   └── Config.js
│   ├── routes/               # Rutas de la API
│   │   ├── auth.routes.js
│   │   ├── services.routes.js
│   │   ├── categories.routes.js
│   │   ├── config.routes.js
│   │   └── upload.routes.js
│   ├── uploads/              # Carpeta temporal para uploads
│   ├── index.js              # Servidor principal
│   └── package.json
│
└── README.md
```

---

## 🛠️ Instalación y Configuración

### **Prerrequisitos**
- Node.js v18 o superior
- Cuenta en MongoDB Atlas
- Cuenta en Cloudinary

### **1. Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd paola-deco-project
```

### **2. Configurar el Backend**
```bash
cd server
npm install
```

Crear archivo `.env` en `/server`:
```env
PORT=5000
MONGODB_URI=tu_uri_de_mongodb_atlas
JWT_SECRET=tu_clave_secreta_jwt
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### **3. Configurar el Frontend**
```bash
cd ../client
npm install
```

Crear archivo `.env` en `/client`:
```env
VITE_API_URL=http://localhost:5000/api
```

### **4. Ejecutar el Proyecto**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

El frontend estará disponible en `http://localhost:5173`  
El backend estará disponible en `http://localhost:5000`

---

## 🎯 Próximos Pasos (Roadmap)

- [ ] Filtros avanzados por categoría en el catálogo
- [ ] Sistema de búsqueda de servicios
- [ ] Paginación en el catálogo
- [ ] Modo oscuro (Dark Mode)
- [ ] Galería lightbox para imágenes
- [ ] Sistema de favoritos
- [ ] Formulario de contacto con envío de emails
- [ ] Dashboard con estadísticas (servicios más vistos, etc.)
- [ ] Despliegue en producción (Vercel + Render)
- [ ] Optimización SEO
- [ ] PWA (Progressive Web App)

---

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado con fines educativos para dominar el stack MERN completo, incluyendo:
- Arquitectura cliente-servidor
- Autenticación y autorización
- Gestión de estado global
- Upload de archivos
- Integración con servicios cloud
- Diseño responsivo moderno

---

## 📄 Licencia

Este proyecto es de uso educativo.