# Proceso
## 1. Estructura app (back)
### `npx create-next-app@latest`
### Estructura hexagonal
### Creación domain y app
## 2. Users (back)
### Creación _infrastructure/domains_ "in-memory"
### "Create" user & "Read" users
### "Update" user
### "Delete" user
## 3. Rol (back)
### "Create" rol
### "Update" rol
## 4. MongoDb (back)
### Instalación dependencias
### Creación _infrastructure/domains_
### Adaptación a mejor app (bdd/backend)
## 5. Thirdweb (back)
### Creación arquitectura hexagonal
- [ ] Revisar las funciones limitadas en [`thirdweb-auth-repository`](/src/core/infrastructure/repositories/thirdweb-auth-repository.ts)
### Modificar "jwt" cuando el user modifica su info
### El Usuario puede eliminar su perfil
- [x] Se traspasa la lógica de deleteUserAccount de actions a application
### El Administrador puede conceder la Administración a otros usuarios, que lo solicitan previamente.
## 6. Uploadthing (back)
### Funciones con arq hexagonal para update and upload image y integración para user.img
### Usuario puede no subir imagen y modificar sus datos
### Rename name files and document it
## 7. Velite (front)
### Configurar rutas principales y documentar
### Configurar navegador `(main)`
### Configurar switch themes
### Utilizar velite para mostrar ejercicios
### Dar estilos a los archivos mdx utilizando plugins
**ACTUALIDAD**
**FUTURO**
#### El Administrador puede eliminar un usuario
- _Directamente se optara por la opción de vetar ya que no tiene lógica que elimine sin notificar ni nada._
- [ ] El Administrador puede vetar de la app ciertas carteras/users