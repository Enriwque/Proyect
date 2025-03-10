# Proyect

## Backend


### Descripción

Esta API proporciona acceso a datos de usuarios, personajes, capítulos y publicaciones. Está construida con Node.js y Express, y utiliza MongoDB como base de datos.

### Estructura

### src

![png](/proyect/Backend/images/@Captura%20de%20pantalla%202025-03-10%20202258.png)

### Endpoints

#### Usuarios

- **GET /api/v1/users**: Obtiene una lista de todos los usuarios.
- **GET /api/v1/users/{id}**: Obtiene un usuario por su ID.
- **POST /api/v1/users/register**: Registra un nuevo usuario.
- **POST /api/v1/users/login**: Inicia sesión un usuario.
- **PUT /api/v1/users/update/{id}**: Actualiza un usuario por su ID.
- **DELETE /api/v1/users/delete/{id}**: Elimina un usuario por su ID.
- **POST /api/v1/users/forgot**: Solicita un restablecimiento de contraseña.
- **POST /api/v1/users/forgot/{reseToken}**: Restablece la contraseña con un token.

#### Personajes

- **GET /api/v1/wikih**: Obtiene una lista de todos los personajes.
- **GET /api/v1/wikih/{id}**: Obtiene un personaje por su ID.
- **POST /api/v1/wikih/new/{token}**: Crea un nuevo personaje.
- **PUT /api/v1/wikih/update/{id}/{token}**: Actualiza un personaje por su ID.
- **DELETE /api/v1/wikih/delete/{id}/{token}**: Elimina un personaje por su ID.

#### Capítulos

- **GET /api/v1/chapters**: Obtiene una lista de todos los capítulos.
- **GET /api/v1/chapters/{id}**: Obtiene un capítulo por su ID.
- **POST /api/v1/chapters/new/{token}**: Crea un nuevo capítulo.
- **PUT /api/v1/chapters/update/{id}/{token}**: Actualiza un capítulo por su ID.
- **DELETE /api/v1/chapters/delete/{id}/{token}**: Elimina un capítulo por su ID.

#### Publicaciones

- **GET /api/v1/posts**: Obtiene una lista de todas las publicaciones.
- **GET /api/v1/posts/{id}**: Obtiene una publicación por su ID.
- **POST /api/v1/posts/post/{token}**: Crea una nueva publicación.
- **POST /api/v1/posts/comment/{id}/{token}**: Comenta en una publicación.
- **DELETE /api/v1/posts/delete/{id}/{token}**: Elimina una publicación por su ID.

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

### Documentación

La documentación completa de la API está disponible en `/api-docs`.

## Rúbrica de la web

![png](/proyect/Backend/images/Rúbrica_de_mi_web.png)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.