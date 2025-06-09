# Proyect

# Frontend

## Páginas principales

- **/ (Inicio)**  
  Página principal con bienvenida, buscador y acceso rápido a personajes y capítulos.

- **/personajes**  
  Lista de todos los personajes disponibles.

- **/personaje/:id**  
  Detalle de un personaje específico, incluyendo historia, apariencia, personalidad, trivia y galería.

- **/capitulos**  
  Lista de todos los capítulos.

- **/capitulo/:id**  
  Detalle de un capítulo específico, mostrando sinopsis, desarrollo y personajes relacionados.

- **/chat**  
  Página de chat donde los usuarios pueden ver publicaciones, comentar y crear nuevos posts.

- **/chat/perfil**  
  Perfil del usuario, permite editar datos, ver y eliminar publicaciones propias, y eliminar la cuenta.

- **/about**  
  Información sobre la web y la serie.

- **/contactos**  
  Página de contacto.

- **/sesion**  
  Página de inicio de sesión.

- **/registro**  
  Página de registro de nuevos usuarios.

- **/password**  
  Solicitud de recuperación de contraseña.

- **/password/:token**  
  Restablecimiento de contraseña con token.

- **/resultados/:resCharIds/:resChapIds**  
  Resultados de búsqueda de personajes y capítulos.

## Componentes principales

- **components/general/Navbar.jsx**  
  Barra de navegación principal, muestra enlaces a las páginas principales y opciones según el estado de sesión.

- **components/general/Footer.jsx**  
  Pie de página con información de derechos.

- **components/info/Buscador.jsx**  
  Buscador de personajes y capítulos.

- **components/info/InfoList.jsx**  
  Renderiza listas de personajes y capítulos.

- **components/info/MiniTarjetaPersonaje.jsx**  
  Tarjeta resumen de personaje para listados.

- **components/info/MiniTarjetaCapitulo.jsx**  
  Tarjeta resumen de capítulo para listados.

- **components/info/Galería.jsx**  
  Galería de imágenes de un personaje.

## Otros archivos relevantes

- **services/fetch.js**  
  Hook personalizado para peticiones HTTP.

- **page.css / index.css**  
  Estilos generales de la aplicación.

---

Esta estructura permite una navegación clara y modular entre personajes, capítulos, publicaciones y gestión de usuario.

### Tecnologias

- React
- Vite
- Vercel

## Backend


### Descripción

Esta API proporciona acceso a datos de usuarios, personajes, capítulos y publicaciones. Está construida con Node.js y Express, y utiliza MongoDB como base de datos.

### Estructura

### src

![png](/proyect/Backend/images/@Captura%20de%20pantalla%202025-03-10%20202748.png)

# Endpoints de la API

## Usuarios

- **GET /api/v1/users**  
  Obtiene una lista de todos los usuarios.

- **GET /api/v1/users/{id}**  
  Obtiene un usuario por su ID.

- **POST /api/v1/users/register**  
  Registra un nuevo usuario.  
  **Body:**  
  ```json
  {
    "name": "Nombre",
    "email": "correo@ejemplo.com",
    "password": "1234",
    "age": 25
  }
  ```

- **POST /api/v1/users/login**  
  Inicia sesión un usuario.  
  **Body:**  
  ```json
  {
    "email": "correo@ejemplo.com",
    "password": "1234"
  }
  ```

- **PUT /api/v1/users/update/{id}**  
  Actualiza un usuario por su ID.  
  **Body:**  
  ```json
  {
    "name": "NuevoNombre",
    "email": "nuevo@ejemplo.com",
    "age": 26
  }
  ```

- **DELETE /api/v1/users/delete/{id}**  
  Elimina un usuario por su ID.

- **POST /api/v1/users/forgot**  
  Solicita un restablecimiento de contraseña.  
  **Body:**  
  ```json
  {
    "email": "correo@ejemplo.com"
  }
  ```

- **POST /api/v1/users/forgot/{reseToken}**  
  Restablece la contraseña con un token.  
  **Body:**  
  ```json
  {
    "newPassword": "nuevaClave"
  }
  ```

---

## Personajes

- **GET /api/v1/wikih**  
  Obtiene una lista de todos los personajes.

- **GET /api/v1/wikih/{id}**  
  Obtiene un personaje por su ID.

- **POST /api/v1/wikih/new/{token}**  
  Crea un nuevo personaje.  
  **Body:**  
  ```json
  {
    "title": "Nombre",
    "content": {},
    "name": "Nombre",
    "age": 10
  }
  ```

- **PUT /api/v1/wikih/update/{id}/{token}**  
  Actualiza un personaje por su ID.  
  **Body:**  
  ```json
  {
    "title": "NuevoNombre",
    "content": {}
  }
  ```

- **DELETE /api/v1/wikih/delete/{id}/{token}**  
  Elimina un personaje por su ID.

---

## Capítulos

- **GET /api/v1/chapters**  
  Obtiene una lista de todos los capítulos.

- **GET /api/v1/chapters/{id}**  
  Obtiene un capítulo por su ID.

- **POST /api/v1/chapters/new/{token}**  
  Crea un nuevo capítulo.  
  **Body:**  
  ```json
  {
    "title": "Título",
    "part": 1,
    "sinopsis": "Sinopsis",
    "desarrollo": "Desarrollo"
  }
  ```

- **PUT /api/v1/chapters/update/{id}/{token}**  
  Actualiza un capítulo por su ID.  
  **Body:**  
  ```json
  {
    "title": "Nuevo Título"
  }
  ```

- **DELETE /api/v1/chapters/delete/{id}/{token}**  
  Elimina un capítulo por su ID.

---

## Publicaciones

- **GET /api/v1/posts**  
  Obtiene una lista de todas las publicaciones.

- **GET /api/v1/posts/{id}**  
  Obtiene una publicación por su ID.

- **POST /api/v1/posts/post/{token}**  
  Crea una nueva publicación.  
  **Body (form-data):**  
  - text: Texto del post

- **POST /api/v1/posts/comment/{id}/{token}**  
  Comenta en una publicación.  
  **Body:**  
  ```json
  {
    "text": "Comentario"
  }
  ```

- **DELETE /api/v1/posts/delete/{id}/{token}**  
  Elimina una publicación por su ID.

### Configuración

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno en el archivo `.env`.
4. Inicia el servidor con `npm start`.

### Tecnologías

- Node.js
- Express
- MongoDB
- JWT para autenticación
- Swagger para documentación de la API
- Render

### Documentación

La documentación completa de la API está disponible en `/api-docs`.

## Rúbrica de la web

![png](/proyect/Backend/images/Rúbrica_de_mi_web.png)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.