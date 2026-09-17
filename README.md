<p align="center">
  <img src="src/assets/sd-logo.png" alt="SD Creations" width="180" />
</p>

# SD CREATIONS · Catálogo y personalización

Una tienda web para descubrir productos, crear una idea personalizada y preparar un pedido por WhatsApp. El proyecto combina un catálogo administrable, un carrito persistente y un generador de propuestas visuales.

**React · Vite · Express · MongoDB · Cloudinary · Pollinations**

## El proyecto

SD CREATIONS reúne la experiencia de compra y la gestión del catálogo en una misma aplicación. Las personas pueden explorar productos por departamento, elegir variantes y enviar su selección al negocio; el equipo puede administrar productos desde la ruta `/admin`.

El flujo de compra termina en WhatsApp, donde se acuerdan los detalles del pedido. La aplicación no procesa pagos en línea.

## Funcionalidades

- **Catálogo conectado a la API:** departamentos, búsqueda por texto y fichas de producto.
- **Carrito persistente:** cantidades, variantes, personalización y total guardados en `localStorage`.
- **Pedidos por WhatsApp:** preparación de un mensaje con el contenido del carrito.
- **Personalización visual:** generación de propuestas mediante Pollinations, sujeta a la configuración y disponibilidad del servicio.
- **Panel administrativo:** inicio de sesión, creación, edición y eliminación de productos.
- **Imágenes del catálogo:** carga desde el panel mediante Cloudinary.
- **Información comercial:** secciones de cómo comprar, entregas y contacto.

## Arquitectura

| Capa | Tecnologías y responsabilidad |
| --- | --- |
| Interfaz | React 19, Vite 8 y React Router; tienda y panel administrativo. |
| Estado del carrito | React Context y almacenamiento local del navegador. |
| API | Node.js y Express 5; catálogo, autenticación, imágenes y generación de diseños. |
| Datos | MongoDB con Mongoose. |
| Autenticación | JWT y contraseñas con bcryptjs. |
| Servicios externos | Cloudinary para imágenes y Pollinations para propuestas visuales. |
| Revisión de código | Oxlint en el frontend. |

## Ejecutar en local

### 1. Preparar el proyecto

Necesitas Git, npm, Node.js 22.13 o superior dentro de la rama 22 —o Node.js 24— y una instancia de MongoDB accesible.

```bash
git clone https://github.com/MqgiaG/SD-CREATIONS.git
cd SD-CREATIONS
npm ci
cd server
npm ci
cd ..
```

### 2. Configurar el frontend

Crea un archivo `.env.local` en la raíz:

```dotenv
VITE_API_URL=http://localhost:3001
```

La URL debe apuntar a la raíz del servidor, sin añadir `/api`. Los componentes agregan esa parte al consultar cada endpoint. Reinicia Vite después de cambiar esta variable.

### 3. Configurar la API

Crea `server/.env` con tus valores locales:

```dotenv
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/sd_creations
JWT_SECRET=REEMPLAZAR_POR_UN_SECRETO_ALEATORIO_LARGO
```

MongoDB debe estar en ejecución. La API requiere `MONGODB_URI` y `JWT_SECRET` para iniciar.

Añade estas variables cuando vayas a utilizar las integraciones:

| Variable en `server/.env` | Uso |
| --- | --- |
| `CLOUDINARY_CLOUD_NAME` | Nombre del espacio de Cloudinary. |
| `CLOUDINARY_API_KEY` | Clave de Cloudinary. |
| `CLOUDINARY_API_SECRET` | Secreto de Cloudinary. |
| `POLLINATIONS_API_KEY` | Clave para generar propuestas visuales. |
| `POLLINATIONS_IMAGE_MODEL` | Modelo de generación; el código usa `zimage` por defecto. |

Guarda las credenciales únicamente en el servidor. Las variables con prefijo `VITE_` quedan expuestas al navegador; no deben contener secretos. Los archivos de entorno están excluidos por `.gitignore`.

### 4. Crear el administrador y cargar el catálogo

Añade a `server/.env`:

```dotenv
ADMIN_NAME=Administrador
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=REEMPLAZAR_POR_UNA_CONTRASENA_PROPIA
```

La contraseña debe tener al menos ocho caracteres. Desde `server/`:

```bash
node scripts/create-admin.js
```

Para importar el catálogo inicial en una base de desarrollo vacía:

```bash
node scripts/seed-products.js
```

El importador se cancela si ya existen productos. También puedes crear productos desde el panel administrativo.

### 5. Iniciar ambos servicios

En una terminal, desde `server/`:

```bash
npm run dev
```

En otra terminal, desde la raíz del repositorio:

```bash
npm run dev
```

- Tienda: [localhost:5173](http://localhost:5173).
- Administración: [localhost:5173/admin](http://localhost:5173/admin).
- Estado de la API: [localhost:3001/api/health](http://localhost:3001/api/health).

Si Vite utiliza otro puerto, actualiza `CLIENT_ORIGIN` y reinicia la API. El catálogo requiere la API y MongoDB; la subida de imágenes y la generación de diseños requieren sus respectivas credenciales.

## Comandos disponibles

| Ubicación | Comando | Acción |
| --- | --- | --- |
| Raíz | `npm run dev` | Iniciar Vite. |
| Raíz | `npm run build` | Generar el frontend en `dist/`. |
| Raíz | `npm run preview` | Revisar el build localmente. |
| Raíz | `npm run lint` | Ejecutar Oxlint. |
| `server/` | `npm run dev` | Iniciar la API con recarga al cambiar archivos. |
| `server/` | `npm start` | Iniciar la API sin modo de observación. |

## Estructura principal

```text
SD-CREATIONS/
├── src/
│   ├── assets/             # Identidad visual e imágenes
│   ├── components/         # Catálogo, carrito, personalización y secciones
│   ├── context/            # Estado y persistencia del carrito
│   ├── data/               # Datos base del catálogo
│   ├── hooks/              # Acceso al carrito
│   ├── pages/Admin/        # Panel administrativo
│   └── App.jsx            # Rutas de tienda y administración
├── server/
│   ├── middleware/        # Autorización
│   ├── models/            # Modelos de administradores y productos
│   ├── routes/            # Autenticación, productos y cargas
│   ├── scripts/           # Creación de administrador e importación
│   └── index.js           # API y generación de diseños
└── vite.config.js
```

## Mantener y publicar

- **Productos y variantes:** utiliza el panel `/admin`.
- **Identidad y secciones:** revisa `src/assets/` y `src/components/`.
- **Carrito:** su lógica vive en `src/context/CartContext.jsx`.
- **Destinatarios de WhatsApp:** revisa los componentes de carrito, personalización y contacto antes de adaptar el proyecto.
- **Despliegue:** publica `dist/` como frontend y ejecuta `server/` como servicio Node.js independiente. Configura `VITE_API_URL` antes del build y `CLIENT_ORIGIN` en el servidor. El alojamiento del frontend debe devolver `index.html` al abrir rutas como `/admin`.

## Desarrollo

Desarrollado por [Gerardo Rangel · MqgiaG](https://github.com/MqgiaG).
