<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Next-hexa-test
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>
Test de arquitectura hexagonal con NextJs 14

## Proceso

### 1. Estructura app
#### `npx create-next-app@latest`
- Iniciar la aplicación usando el comando de NextJs, usando la carpeta "src".
#### Estructura hexagonal
- Definir las carpetas de una arquitectura hexagonal, en una carpeta llamada "core".
#### Creación domain y app
- Para esta aplicación tendremos que cumplir estas reglas:
  - Usuarios con: id(único, puedes generarlo con la fecha + nombre), nombre, roleId (id que lo vincula a otra tabla con su rol, el cual podrá no existir, con lo cual significara que es un usuario normal), createdAt(timestamp de creación) y updatedAt(timestamp de edit).
  - Roles con: id(único, puedes generarlo con la fecha + nombre), nombre(nombre del usuario), permissions (tipo de permiso, definido en un enum, con las opciones: "ADMIN", "STUDENT", "STUDENT_PRO"), createdAt(timestamp de creación) y updatedAt(timestamp de edit).
  - 🙋‍♂️💡⏫ Para este caso puedes utilizar tipos "string" para las fechas, ya que no usaremos persistencia para nuestro primer repositorio de infraestructura.
  - Para los repositorios, necesitaremos definir funciones para "CRUD", en el caso del "Read", buscaremos por id y también todos en el caso de los usuarios. En el caso de los roles definiremos una función para devolver todos los "roles" con un permissions especifico (por ejemplo, todos los administradores)
- Creación del dominio.
- Creación de los use-cases necesarios.
- También puedes realizar la infraestructura, creando así toda la aplicación hexagonal. Sino deberás crear esta parte después.
### 2. Users
#### `InMemoryUserRepository`, "Create" user and "Read" users
- Crear `InMemoryUserRepository`, si todavía no se ha hecho.
- En "actions", crearemos funciones para "Create" usuarios, utilizando SSR.
- En nuestra pagina, implementaremos un componente con un formulario para crear el usuario.
- Haremos lo mismo con el "Read", el cual deberá devolver todos los usuarios. 
- Puedes utilizar estos template para empezar:
<details>
<summary><pre>  -> componentes 📋</pre></summary>

```html 
  <!-- Componente Create -->
  <div>
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form className="flex h-20 items-center space-x-4">
        <div className="flex space-x-10 h-20 items-center">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full p-4 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <button
          className="inline-flex items-center px-4 py-4 border border-transparent hover:border-gray-800  text-sm font-medium rounded-md shadow-sm shadow-gray-300 hover:shadow-lg text-gray-500 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Create User
        </button>
      </form>
    </div>
```

```html
  <!-- Pagina -->
  <main  className="container h-dvh mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <UserForm/>
    <!-- <UsersTable/> Componente para el "Read" -->
    </div>
  </main>
```

```html
  <!-- Componente Read -->
  <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr >
              <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-2 xl:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Edit
              </th>
              <!--Otras acciones-->
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <!--Por cada usuario-->
              <tr className="hover:bg-gray-50">
                <td className="px-2 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  [nombre]
                </td>
                <td className="px-2 xl:px-6 py-4 whitespace-nowrap">
                  <a
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link>
                </td>
                <!--Futuras acciones-->
              </tr>
            <!---->
          </tbody>
        </table>
      </div>
    </div>
```
</details>

#### "Update" user
- Crearemos la acción de hacer update en actions, implementando-la en una pagina dinámica, la cual utilizara el componente del formulario del usuario.
- 🧑‍🎓⚠️➡️ _En este punto:_ Solo tendremos un formulario para el usuario, el cual se utilizara para crear y hacer update.
- Implementaremos un botón en la tabla de usuarios, que al hacer click nos lleve al formulario para hacer update del usuario escogido (en el template de la tabla puedes encontrar unos estilos para utilizarlo).
#### "Delete" user
- Crearemos la acción de hacer delete, implementando-la en un componente, el cual utilizaremos en la tabla de usuarios. Para el botón puedes utilizar este template:
```html
  <button className="text-red-500 hover:text-red-700">
            Delete
  </button>
```
### 3. Rol
#### "Create" rol
- Para este punto deberías tener hecho ya la estructura hexagonal de los rol. Incluido el repositorio `InMemoryRoleRepository`. Si hay alguna parte que aun no has hecho deberías terminarla en esta parte.
- 💡🧠 ➡️ _En este punto:_ Piensa que use-cases serán necesarios y usarán solo el repositorio `InMemoryRoleRepository`.
- Creamos la funcionalidad de crear un rol y la implementamos, al necesitar modificar el user para asignarle el id del su rol, recomendamos crear un "service", al utilizar ambos repositorios.
- Para implementarla puedes usar el siguiente template:
```html
  <div>
      <label htmlFor="rolePermission" className="sr-only">Role Permission</label>
      <select id="role" name="rolePermission">
          <option value="null">User</option>
          <option value="ADMIN">Admin</option>
          <option value="STUDENT">Student</option>
          <option value="STUDENT_PRO">Student pro</option>
      </select>
  </div>
  <button>Save type</button>
```

    💡🧠⏫ Recomendamos crear un componente separado para manejar mejor la funcionalidad.
#### "Update" rol
- Creamos a la funcionalidad de modificar un rol, recomendamos en "services" también.
- Utiliza el mismo componente que se usa para el "Create".
- 🧠⚠️⏫ Recuerda que en el caso de que es usuario se modifique para ser de nuevo un usuario corriente, habrá que marcar como null su roleId.
- 🧑‍🎓⚠️➡️ _En este punto:_ Has de ser capaces de crear usuarios, y asignar-les un rol, incluso cuando este vuelva a ser "usuario normal". Esto significa que se eliminaran del array de roles y se asignará null en su roleId.

### 4. MongoDb
#### Información y dependencias
- _En este apartado, al no ser un ejercicio centrado en MongoDB y este apartado solo ser un ejemplo del potencial de la arquitectura hexagonal, proporcionare todo el código necesario para la implementación de esta parte sin tener conocimientos de MongoDB._
- _Obtén aquí mas información sobre como utilizar: [mongoose](https://mongoosejs.com/) o [MongoDb](https://www.mongodb.com/docs/). Herramientas utilizadas para el desarrollo de esta sección._
- Utilizaremos el comando `npm i mongoose` para instalar las dependencias necesarias para esta sección.
- Configuraremos el archivo `.env` para incluir la clave secreta `MONGODB_URI`.
#### Implementación
- Creamos una clase en nuestra infraestructura en una carpeta de adaptadores ("adapters"), un archivo para conectar-nos a MongoDB.
- A continuación, crearemos dos repositorios para gestionar el almacenamiento con MongoDb.
- 🧑‍🎓⚠️➡️ _En este punto:_ Con solo cambiar un par de lineas, en el archivo de actions, debería funcionar perfectamente 
```ts
// const userRepository = new InMemoryUserRepository()
// const roleRepository = new InMemoryRoleRepository()
const userRepository = new MongooseUserRepository()
const roleRepository = new MongooseRoleRepository()
```
- Puedes utilizar los siguientes ejemplos:
<details>
<summary><pre>  -> componentes 📋</pre></summary>


```ts
//src/core/infrastructure/adapters/mongo-db-connection.ts
import mongoose, { Connection } from 'mongoose';

type DBConnection = {
    isConnected: boolean;
  }

export const connectToDB = async ():Promise<Connection> => {
  const connection: DBConnection = {isConnected: false};
  try {
    if (connection.isConnected) return mongoose.connection;
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Connected!");
    return db.connection;
    
  } catch (error: any) {
    throw new Error(error);
  }
};
export abstract class MongoDbConnection {
    private connection: Connection | null = null;
    protected async connect(): Promise<void> {
        if (!this.connection) {
            try {
                this.connection = await connectToDB();
            } catch (error) {
                console.error("Failed to connect to the database:", error);
                throw new Error("Unable to establish database connection");
            }
        }
    }
    public async getConnection(): Promise<Connection> {
        if (!this.connection) {
            await this.connect();
        }
        if (!this.connection) {
            throw new Error("Database connection not established.");
        }
        return this.connection;
    }
}
```

```ts
//src/core/infrastructure/repositories/mongoose-user-repository.ts
import { User } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/domain/repositories/user-repository';
import { UserDocument, UserModel } from '@/models/user-role-schema';
import { MongoDbConnection } from '../adapters/mongo-db-connection';


export class MongooseUserRepository extends MongoDbConnection implements UserRepository {

    async create(user: User): Promise<User> {
        await this.connect();
        const newUser = new UserModel(user)
        const savedUser = await newUser.save()
        console.log("savedUser: ",savedUser)
        return this.documentToUser(savedUser)

    }
    async findById(id: string): Promise<User | null> {
        await this.connect()
        const user = await UserModel.findById(id)
        return user ? this.documentToUser(user) : null
    }
    async update(id: string, name: string, roleId?: string): Promise<User> {
        await this.connect(); // Asegúrate de que la conexión esté establecida
    
        // Busca el usuario por su ID
        const user = await UserModel.findById(id);
        if (!user) throw new Error("Error al encontrar el usuario");
    
        // Actualiza los campos necesarios
        user.name = name;
        user.roleId = roleId !== undefined ? roleId : user.roleId; // Mantiene el valor actual si roleId no se proporciona
        user.updatedAt = Date.now(); // Actualiza la fecha de modificación como timestamp
    
        // Guarda los cambios en la base de datos
        const updatedUser = await user.save();
        console.log("updated user: ",updatedUser)
        return this.documentToUser(updatedUser); // Convierte el documento actualizado a la entidad User
    }
    async delete(id:string):Promise<void> {
        await this.connect()
        const result = await UserModel.deleteOne({_id:id})
        if (result.deletedCount === 0) throw new Error(`User with id ${id} not found`);
    }
    async findAll(): Promise<User[] | null> {
        await this.connect()
        const users = await UserModel.find()
        return users.length > 0 ? users.map(this.documentToUser):null
    }
    async deleteRoleId(id: string): Promise<void> {
        await this.connect()
        const result = await UserModel.updateOne({ _id: id }, { $set: { roleId: null } });
        if (result.matchedCount === 0) throw new Error(`User with id ${id} not found`);
    }
    private documentToUser(doc: UserDocument): User {
        return {
          id: doc._id.toString(),
          name: doc.name,
          roleId: doc.roleId ? doc.roleId.toHexString() : null,
          createdAt: doc.createdAt.toISOString(),
          updatedAt: doc.updatedAt.toISOString()
        };
      }

}
```

```ts
//src/core/infrastructure/repositories/mongoose-role-repository.ts
import { RoleRepository } from "@/core/domain/repositories/role-repository";
import { MongoDbConnection } from "../adapters/mongo-db-connection";
import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleDocument, RoleModel } from "@/models/user-role-schema";

export class MongooseRoleRepository extends MongoDbConnection implements RoleRepository{
    async create(role: Role): Promise<Role> {
        await this.connect()
        const newRole = new RoleModel(role)
        const savedRole = await newRole.save()
        console.log("saved role: ", savedRole)
        return this.documentToRole(savedRole)
    }
    async findById(id: string): Promise<Role | null> {
        this.connect()
        const role = await RoleModel.findById(id)
        return role ? this.documentToRole(role):null
        
    }
    async update(id: string, permissions: RoleType): Promise<Role> {
        await this.connect()
        const role = await RoleModel.findById(id)
        role.permissions = permissions
        const updatedRole = await role.save()
        return this.documentToRole(updatedRole)
    }
    async delete(id: string): Promise<void> {
        await this.connect()
        await RoleModel.findByIdAndDelete(id)
    }
    private documentToRole(doc: RoleDocument): Role {
        return {
            id: doc._id.toString(),
            name: doc.name,
            permissions: doc.permissions as RoleType,
            createdAt: doc.createdAt.toISOString(),
            updatedAt: doc.updatedAt.toISOString()
        }
    }
}
```
</details>


## [Recursos](https://github.com/SKRTEEEEEE/markdowns)

## Contacto

### Agradecimientos

### Licencia

### Información de Contacto

#### [Envíame un mensaje](mailto:adanreh.m@gmail.com)

### Contribuciones y Problemas

Si encuentras problemas o deseas contribuir al proyecto, por favor, crea un issue en el repositorio.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
