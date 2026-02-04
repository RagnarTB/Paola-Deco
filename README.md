#  Paola Deco & Eventos

Plataforma web **Full Stack (MERN)** profesional para la gestión y visualización de un catálogo de servicios de decoración de eventos. Sistema completo con panel de administración avanzado, autenticación segura, gestión dinámica de contenido multimedia, y experiencia de usuario optimizada.

---

##  Tecnologías Utilizadas

### **Frontend (Cliente)**
- **React 19** + **Vite** - Interfaz moderna y reactiva con HMR
- **Tailwind CSS** - Sistema de diseño responsivo y personalizado
- **React Router DOM v7** - Navegación SPA con rutas protegidas
- **Axios** - Cliente HTTP para consumo de API REST
- **js-cookie** - Manejo seguro de cookies para autenticación
- **React Icons** - Iconografía moderna
- **React Hot Toast** - Notificaciones toast elegantes y no intrusivas
- **SweetAlert2** - Modales de confirmación personalizados

### **Backend (Servidor)**
- **Node.js** + **Express 5** - Servidor RESTful API robusto
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - ODM para modelado y validación de datos
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcryptjs** - Encriptación segura de contraseñas
- **Cloudinary** - CDN y almacenamiento de imágenes en la nube
- **Multer** - Procesamiento de uploads multipart/form-data
- **dotenv** - Gestión de variables de entorno
- **cookie-parser** - Parseo de cookies HTTP
- **fs-extra** - Operaciones de sistema de archivos mejoradas

---

##  Funcionalidades Implementadas

###  **Zona Pública**

#### **Página de Inicio Dinámica**
-  **Carrusel Hero** completamente configurable desde el admin
  - Múltiples slides con imágenes de alta calidad
  - Títulos, subtítulos y botones personalizables
  - Transiciones suaves y autoplay
  - Navegación manual con flechas e indicadores
-  **Sección "¿Por qué elegirnos?"** con características destacadas
  - Iconos personalizables de Google Material Symbols
  - Títulos y descripciones editables
  - Animaciones hover elegantes
-  **Galería de Categorías** con imágenes reales
  - Carga dinámica desde la base de datos
  - Solo muestra categorías activas
  - Efectos de hover con escala de imagen
  - Enlaces directos al catálogo filtrado
-  **Sección de Videos TikTok**
  - Integración nativa de videos de TikTok
  - Carrusel de videos destacados
  - Diseño tipo smartphone con efectos visuales
  - Extracción automática de embed IDs

#### **Catálogo Avanzado**
-  **Sistema de Búsqueda en Tiempo Real**
  - Búsqueda por título con debounce (400ms)
  - Resultados instantáneos sin recargar página
-  **Filtros Múltiples**
  - Filtro por categoría (radio buttons)
  - Filtro por rango de precios (mín/máx)
  - Solo muestra servicios activos al público
  - Combinación de filtros simultáneos
-  **Paginación del Lado del Servidor**
  - Carga eficiente de resultados
  - Navegación entre páginas
  - Contador de resultados totales
-  **Diseño Responsivo**
  - Sidebar de filtros en desktop
  - Filtros colapsables en móvil
  - Grid adaptativo (1/2/3 columnas)
-  **Tarjetas de Servicio**
  - Imagen principal con efecto zoom hover
  - Badge de categoría
  - Precio destacado
  - Enlace a página de detalle

#### **Página de Detalle del Servicio**
-  Galería de imágenes completa
-  Información detallada del servicio
-  Precio y categoría destacados
-  Botón de contacto directo por WhatsApp

#### **Componentes Globales**
-  **Navbar** con información dinámica del sitio
-  **Footer** con datos de contacto configurables
-  **Integración WhatsApp** en múltiples puntos
-  **Diseño 100% Responsivo** en todos los dispositivos

---

###  **Sistema de Autenticación**

-  **Registro de Administradores**
  - Validación de datos en frontend y backend
  - Encriptación bcrypt (10 rounds)
  - Prevención de emails duplicados
-  **Login Seguro**
  - Autenticación con JWT
  - Tokens almacenados en cookies httpOnly
  - Validación de credenciales
  - Mensajes de error descriptivos
-  **Logout**
  - Limpieza de cookies
  - Redirección automática
  - Actualización de estado global
-  **Rutas Protegidas**
  - Middleware de verificación de tokens
  - Redirección automática si no autenticado
  - Componente `ProtectedRoute` reutilizable
-  **Context API Global**
  - Estado de autenticación compartido
  - Funciones `signin`, `signup`, `logout`
  - Manejo centralizado de errores
  - Auto-limpieza de errores (5 segundos)

---

### 🎛️ **Panel de Administración Completo**

#### **Dashboard de Servicios**
-  **Tabla Interactiva con Paginación**
  - Vista de todos los servicios (5 por página)
  - Navegación entre páginas (Anterior/Siguiente)
  - Contador de páginas actual/total
-  **Búsqueda en Tiempo Real**
  - Barra de búsqueda con icono
  - Debounce de 500ms para optimizar peticiones
  - Búsqueda por título del servicio
-  **Columnas de Información**
  - Imagen miniatura (thumbnail)
  - Título del servicio
  - Categoría con badge
  - Precio formateado
  - **Estado (Activo/Inactivo)** con toggle visual
-  **Acciones por Servicio**
  - **Botón Editar**: Abre modal de edición
  - **Botón Eliminar**: Confirmación con SweetAlert2
  - **Toggle de Estado**: Activar/desactivar con un clic
-  **Modal de Edición Avanzado**
  - Formulario completo en modal overlay
  - Edición de título, precio, categoría, descripción
  - **Gestión de imágenes**:
    - Vista previa de imágenes existentes
    - Agregar nuevas imágenes (upload a Cloudinary)
    - Eliminar imágenes individuales
    - Soporte para múltiples imágenes
  - Cambio de estado (Activo/Inactivo)
  - Validación en tiempo real
  - Botones Guardar/Cancelar
-  **Notificaciones Toast**
  - Confirmación de acciones exitosas
  - Alertas de errores
  - Indicadores de carga (uploading)
  - Posición top-center no intrusiva
-  **Responsive Design**
  - Tabla con scroll horizontal en móvil
  - Modal adaptado a pantallas pequeñas
  - Botones táctiles optimizados

#### **Gestión de Categorías**
-  **CRUD Completo**
  - Crear categorías con nombre e imagen
  - Editar nombre e imagen inline
  - Eliminar con validación de seguridad
  - **Activar/Desactivar** categorías
-  **Validaciones Inteligentes**
  - Nombres únicos (sin duplicados)
  - Conversión automática a MAYÚSCULAS
  - Generación automática de slugs
  - **Protección de eliminación**: No se puede borrar si tiene servicios asociados
  - **Protección de desactivación**: No se puede desactivar si tiene servicios activos
-  **Upload de Imágenes**
  - Imagen de portada para cada categoría
  - Vista previa en tiempo real
  - Almacenamiento en Cloudinary
  - Indicador de carga
-  **Interfaz de Edición Inline**
  - Modo edición activable por fila
  - Campos de texto y upload de imagen
  - Botones Guardar/Cancelar
  - Sin necesidad de modal separado
-  **Estados Visuales**
  - Badge de estado (ACTIVO/INACTIVO)
  - Colores distintivos (verde/rojo)
  - Toggle con un clic
-  **Tabla Organizada**
  - Imagen miniatura
  - Nombre en mayúsculas
  - Estado con badge
  - Acciones (Editar/Eliminar)

#### **Configuración del Sitio**
-  **Información General**
  - Nombre del sitio
  - Logo (URL)
  - WhatsApp (formato internacional)
  - Email de contacto
  - Dirección física
  - Enlaces a redes sociales (Facebook, Instagram)
-  **Gestión de Slides del Hero**
  - Agregar múltiples slides
  - Campos por slide:
    - Título principal
    - Subtítulo/descripción
    - Texto del botón
    - Imagen de fondo (upload a Cloudinary)
  - Vista previa de imagen
  - Eliminar slides individuales
  - Orden personalizable
-  **Integración de Videos TikTok**
  - Agregar hasta 5 videos
  - Pegar URL de TikTok
  - Extracción automática de embed ID
  - Vista previa del video
  - Eliminar videos
-  **Sección "¿Por qué elegirnos?"**
  - Agregar características destacadas
  - Campos por característica:
    - Icono (nombre de Google Material Symbols)
    - Título
    - Descripción
  - Link directo a biblioteca de iconos
  - Eliminar características
  - Grid responsivo (1/2 columnas)
-  **Guardado Global**
  - Botón "Guardar Configuración" al final
  - Actualiza toda la configuración de una vez
  - Notificación de éxito/error
  - Indicador de carga durante guardado

#### **Sidebar de Navegación**
-  **Diseño Responsivo**
  - Sidebar fijo en desktop
  - Menú hamburguesa en móvil
  - Overlay oscuro en móvil
  - Animación de deslizamiento
  - Cierre automático al navegar (móvil)
-  **Navegación**
  - Dashboard (Servicios)
  - Categorías
  - Configuración
  - Ver Catálogo Público
  - Cerrar Sesión
-  **Estados Visuales**
  - Resaltado de página activa
  - Iconos Material Symbols
  - Hover effects
  - Transiciones suaves

---

###  **Gestión de Imágenes con Cloudinary**

-  **Upload Múltiple**
  - Subida de hasta 5 imágenes por servicio
  - Procesamiento en paralelo con `Promise.all`
  - Indicadores de progreso
-  **Vista Previa**
  - Thumbnails de imágenes subidas
  - Hover para mostrar botón de eliminar
  - Grid responsivo de imágenes
-  **Eliminación Inteligente**
  - Eliminar imágenes individuales
  - Actualización inmediata del estado
  - Limpieza de archivos temporales
-  **Optimización**
  - Compresión automática
  - Transformaciones de Cloudinary
  - URLs seguras (HTTPS)
  - CDN global para carga rápida
-  **Manejo de Errores**
  - Validación de tipos de archivo
  - Mensajes de error descriptivos
  - Rollback en caso de fallo
  - Limpieza de archivos temporales

---

###  **Modelos de Base de Datos**

#### **User** (Administradores)
```javascript
{
  username: String (required, trim),
  email: String (required, unique, trim),
  password: String (required, hashed),
  timestamps: true
}
```

#### **Service** (Servicios/Productos)
```javascript
{
  title: String (required, trim),
  category: String (required),
  price: Number (required),
  description: String (required),
  images: [String],  // URLs de Cloudinary
  features: [String],  // Características
  isPopular: Boolean (default: false),
  isActive: Boolean (default: true),  // NUEVO
  timestamps: true
}
```

#### **Category** (Categorías)
```javascript
{
  name: String (required, unique, trim, uppercase),
  slug: String (lowercase, trim),
  isActive: Boolean (default: true),  // NUEVO
  image: String,  // NUEVO - URL de Cloudinary
  timestamps: true
}
```

#### **Config** (Configuración Global)
```javascript
{
  siteName: String (default: "Paola Deco & Eventos"),
  logoUrl: String,
  whatsapp: String,
  phone: String,
  email: String,
  address: String,
  facebookUrl: String,
  instagramUrl: String,
  heroSlides: [{
    title: String,
    subtitle: String,
    imageUrl: String,
    buttonText: String,
    link: String
  }],
  tiktokVideos: [{  // NUEVO
    url: String,
    embedId: String
  }],
  features: [{  // NUEVO
    icon: String,
    title: String,
    description: String
  }],
  timestamps: true
}
```

---

###  **API REST Endpoints**

#### **Autenticación** (`/api/auth`)
- `POST /register` - Registro de administrador
- `POST /login` - Inicio de sesión
- `POST /logout` - Cierre de sesión

#### **Servicios** (`/api/services`)
- `GET /` - Listar servicios con **filtros, búsqueda y paginación**
  - Query params: `page`, `limit`, `search`, `category`, `isActive`, `minPrice`, `maxPrice`
  - Respuesta: `{ services: [], totalPages, currentPage, totalServices }`
- `GET /:id` - Obtener servicio por ID
- `POST /` - Crear servicio con imágenes (protegido)
- `PUT /:id` - **Actualizar servicio** (editar datos, estado, imágenes) (protegido)
- `DELETE /:id` - Eliminar servicio (protegido)

#### **Categorías** (`/api/categories`)
- `GET /` - Listar categorías ordenadas alfabéticamente
- `GET /:id` - Obtener categoría por ID
- `POST /` - Crear categoría con imagen (protegido)
- `PUT /:id` - **Actualizar categoría** (nombre, estado, imagen) (protegido)
  - Validación: No desactivar si tiene servicios activos
- `DELETE /:id` - Eliminar categoría (protegido)
  - Validación: No eliminar si tiene servicios asociados

#### **Configuración** (`/api/config`)
- `GET /` - Obtener configuración completa del sitio
- `PUT /` - Actualizar configuración (protegido)

#### **Upload** (`/api/upload`)
- `POST /` - Subir imagen a Cloudinary (protegido)
- `DELETE /` - Eliminar imagen de Cloudinary (protegido)

---

##  Estructura del Proyecto

```
paola-deco-project/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── api/
│   │   │   └── services.api.js     # Servicios API organizados por sección
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navegación pública
│   │   │   ├── Footer.jsx          # Footer con contacto dinámico
│   │   │   ├── AdminSidebar.jsx    # Sidebar responsivo del admin
│   │   │   └── ServiceModal.jsx    # Modal de edición de servicios
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Estado global de autenticación
│   │   ├── layouts/
│   │   │   ├── PublicLayout.jsx    # Layout con Navbar + Footer
│   │   │   └── AdminLayout.jsx     # Layout con Sidebar responsivo
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Hero + Features + Categorías + TikTok
│   │   │   ├── CatalogPage.jsx     # Búsqueda + Filtros + Paginación
│   │   │   ├── ServiceDetailPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── AdminDashboardPage.jsx  # Tabla + Modal + Búsqueda
│   │   │   ├── ServiceFormPage.jsx     # Crear servicio
│   │   │   ├── CategoriesPage.jsx      # CRUD categorías
│   │   │   └── AdminConfigPage.jsx     # Config completa del sitio
│   │   ├── App.jsx                 # Rutas y providers
│   │   ├── ProtectedRoute.jsx      # HOC para rutas protegidas
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js          # Tema personalizado
│   └── package.json
│
├── server/                          # Backend Node.js
│   ├── libs/
│   │   ├── cloudinary.js           # Configuración de Cloudinary
│   │   └── jwt.js                  # Generación de tokens JWT
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js              # Con isActive
│   │   ├── Category.js             # Con isActive e image
│   │   └── Config.js               # Con tiktokVideos y features
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── services.routes.js      # Con filtros y paginación
│   │   ├── categories.routes.js    # Con validaciones de estado
│   │   ├── config.routes.js
│   │   └── upload.routes.js
│   ├── uploads/                    # Archivos temporales
│   ├── index.js                    # Servidor principal
│   ├── .env                        # Variables de entorno
│   └── package.json
│
├── .gitignore
└── README.md
```

---

##  Instalación y Configuración

### **Prerrequisitos**
- Node.js v18 o superior
- npm o yarn
- Cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Cuenta en [Cloudinary](https://cloudinary.com/)

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
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/paola-deco
JWT_SECRET=tu_clave_secreta_super_segura_aqui
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
> El servidor estará corriendo en `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
> La aplicación estará disponible en `http://localhost:5173`

### **5. Crear el Primer Usuario Admin**

Usar herramientas como **Postman** o **Thunder Client**:

```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "Admin",
  "email": "admin@paoladeco.com",
  "password": "admin123"
}
```

Luego iniciar sesión en `/login` con esas credenciales.

---

##  Características de UX/UI

### **Notificaciones y Feedback**
-  **React Hot Toast** para notificaciones no intrusivas
  - Confirmaciones de acciones exitosas
  - Alertas de errores descriptivas
  - Indicadores de carga (uploading, saving)
  - Auto-dismiss después de 3-5 segundos
-  **SweetAlert2** para confirmaciones críticas
  - Confirmación antes de eliminar servicios
  - Diseño personalizado con colores de marca
  - Botones "Confirmar" y "Cancelar"

### **Diseño Responsivo**
-  **Mobile-First Approach**
  - Sidebar colapsable en móvil
  - Menú hamburguesa con overlay
  - Tablas con scroll horizontal
  - Grids adaptables (1/2/3 columnas)
-  **Breakpoints de Tailwind**
  - `sm:` 640px
  - `md:` 768px
  - `lg:` 1024px
  - `xl:` 1280px

### **Animaciones y Transiciones**
-  Hover effects en tarjetas y botones
-  Transiciones suaves de color y escala
-  Animaciones de entrada/salida de modales
-  Efectos de carga (spinners, skeletons)
-  Carrusel con fade transitions

### **Accesibilidad**
-  Iconos con texto descriptivo
-  Botones con estados hover/active/disabled
-  Contraste de colores adecuado
-  Formularios con labels claros

---

##  Seguridad Implementada

-  **Autenticación JWT** con cookies httpOnly
-  **Encriptación de contraseñas** con bcrypt (10 rounds)
-  **Validación de datos** en frontend y backend
-  **Protección de rutas** con middleware
-  **CORS configurado** para origen específico
-  **Prevención de duplicados** en base de datos
-  **Sanitización de inputs** (trim, validaciones)
-  **Manejo seguro de archivos** (limpieza de temporales)

---

##  Próximos Pasos (Roadmap)

### **Funcionalidades**
- [ ] Sistema de roles (Super Admin, Editor, Viewer)
- [ ] Estadísticas y analytics en el dashboard
- [ ] Exportación de datos (CSV, PDF)
- [ ] Sistema de favoritos para usuarios
- [ ] Comentarios y valoraciones de servicios
- [ ] Galería lightbox con zoom
- [ ] Modo oscuro (Dark Mode)
- [ ] Formulario de contacto con envío de emails
- [ ] Integración con Google Analytics
- [ ] Chat en vivo (WhatsApp Business API)

### **Optimizaciones**
- [ ] Lazy loading de imágenes
- [ ] Code splitting y bundle optimization
- [ ] Server-side rendering (SSR) con Next.js
- [ ] Cache de datos con React Query
- [ ] Optimización de imágenes con Cloudinary
- [ ] Compresión de respuestas (gzip)
- [ ] Rate limiting en API

### **Despliegue**
- [ ] Deploy frontend en Vercel
- [ ] Deploy backend en Render o Railway
- [ ] Configuración de dominio personalizado
- [ ] SSL/HTTPS automático
- [ ] Variables de entorno en producción
- [ ] Monitoreo con Sentry
- [ ] Backups automáticos de MongoDB

### **SEO y Marketing**
- [ ] Meta tags dinámicos por página
- [ ] Sitemap.xml generado
- [ ] Open Graph para redes sociales
- [ ] Schema.org markup
- [ ] PWA (Progressive Web App)
- [ ] Integración con Google Search Console

---

##  Tecnologías y Patrones Aplicados

### **Arquitectura**
-  **Arquitectura MVC** en el backend
-  **Component-Based Architecture** en React
-  **RESTful API** con convenciones estándar
-  **Separation of Concerns** (rutas, modelos, controladores)

### **Patrones de Diseño**
-  **Context API** para estado global
-  **Higher-Order Components** (ProtectedRoute)
-  **Custom Hooks** potenciales
-  **Compound Components** (Modal, Sidebar)
-  **Render Props** en algunos casos

### **Best Practices**
-  **DRY (Don't Repeat Yourself)** - Funciones reutilizables
-  **KISS (Keep It Simple, Stupid)** - Código legible
-  **Validación en ambos lados** (cliente y servidor)
-  **Manejo de errores consistente**
-  **Nomenclatura descriptiva** de variables y funciones
-  **Comentarios en código complejo**
-  **Organización modular** de archivos

---

##  Aprendizajes del Proyecto

Este proyecto fue desarrollado con fines educativos para dominar:

### **Frontend**
-  React 19 con hooks modernos
-  Gestión de estado global con Context API
-  Rutas protegidas y navegación programática
-  Formularios controlados y validación
-  Upload de archivos con preview
-  Consumo de APIs con Axios
-  Diseño responsivo con Tailwind CSS
-  Notificaciones y modales personalizados
-  Optimización de renders y performance

### **Backend**
-  Servidor Express con arquitectura escalable
-  Modelado de datos con Mongoose
-  Autenticación JWT y manejo de cookies
-  Upload de archivos con Multer
-  Integración con servicios cloud (Cloudinary)
-  Validación y sanitización de datos
-  Manejo de errores y logging
-  Queries complejas con filtros y paginación
-  Relaciones entre modelos (referencias)

### **Full Stack**
-  Comunicación cliente-servidor
-  Flujo completo de autenticación
-  CRUD operations end-to-end
-  Gestión de estado sincronizado
-  Debugging y testing
-  Git y control de versiones
-  Variables de entorno y configuración
-  Deployment considerations

---

##  Notas Técnicas

### **Convenciones de Código**
- Nombres de categorías siempre en **MAYÚSCULAS**
- Slugs generados automáticamente en **lowercase**
- Precios en formato numérico (sin símbolos)
- URLs de imágenes siempre desde Cloudinary
- Tokens JWT en cookies httpOnly (no localStorage)

### **Limitaciones Actuales**
- Máximo 5 imágenes por servicio
- Máximo 5 videos de TikTok en home
- Paginación fija de 5 servicios por página (admin)
- Paginación de 10 servicios por página (catálogo público)
- Solo un usuario admin (sin sistema de roles)

### **Consideraciones de Rendimiento**
- Debounce en búsquedas (400-500ms)
- Lazy loading de imágenes recomendado
- Índices en MongoDB para búsquedas rápidas
- CDN de Cloudinary para imágenes optimizadas
- Compresión de respuestas en producción

---

##  Contribuciones

Este es un proyecto educativo personal. Si deseas contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de uso **educativo** y personal.

---

##  Contacto

Para consultas sobre el proyecto:
- **Desarrollador**: Tello Bustamante Leonardo Daniel
- **Email**: ldtb2001@gmail.com
- **GitHub**: RagnarTB-github

---

##  Agradecimientos

- **MongoDB** por la base de datos en la nube
- **Cloudinary** por el almacenamiento de imágenes
- **Vercel/Render** para hosting (futuro)
- **Google Fonts** por los iconos Material Symbols
- **Unsplash** por imágenes de placeholder
- **Comunidad de React** por la documentación y recursos

---

** Si este proyecto te fue útil, considera darle una estrella en GitHub!**