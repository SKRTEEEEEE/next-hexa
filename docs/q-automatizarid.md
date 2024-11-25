¡Exacto! Entiendo perfectamente tu razonamiento. Si decides encargarte de generar manualmente los IDs en tu backend, tendrás un control completo sobre cómo se gestionan los valores de los **`_id`**, incluyendo estrategias para evitar duplicados o rellenar "huecos" al eliminar documentos.

Aquí tienes una guía práctica para implementar esta estrategia desde el backend.

---

### **1. Generación de `_id` Personalizado en el Backend**

Puedes construir el **`_id`** personalizado en tu backend combinando `projectId` e idioma (`language`). Ejemplo básico en JavaScript/Node.js:

```javascript
function generateCustomId(projectId, language) {
  return `${projectId}_${language}`;
}
```

Cuando vayas a crear un documento, utiliza esta función para garantizar que el ID tenga el formato deseado.

---

### **2. Evitar Duplicados desde el Backend**

Antes de insertar un documento, puedes verificar si el **`_id`** ya existe en la base de datos:

#### Comprobación previa al insertar:
```javascript
async function createProject(projectId, language, data) {
  const _id = generateCustomId(projectId, language);
  
  const existing = await Project.findById(_id);
  if (existing) {
    throw new Error(`El ID ${_id} ya existe. No se puede duplicar.`);
  }

  const newProject = new Project({ _id, ...data });
  return await newProject.save();
}
```

---

### **3. Gestión de IDs Incrementales**

MongoDB no rellena automáticamente huecos en IDs eliminados, pero puedes implementar tu propio mecanismo para IDs incrementales desde el backend. Aquí te dejo una estrategia:

#### a) **Colección auxiliar para IDs incrementales**
Crea una colección llamada `Counters` que almacene un contador para cada entidad. Ejemplo:

```json
{
  "_id": "project",
  "seq": 5
}
```

#### b) **Generar `projectId` automáticamente**
Usa un sistema de incremento basado en la colección `Counters` al crear un nuevo proyecto.

```javascript
const Counter = mongoose.model('Counter', new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}));

async function getNextSequence(name) {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

async function createProject(language, data) {
  const projectId = await getNextSequence('project');
  const _id = generateCustomId(projectId, language);

  const newProject = new Project({ _id, projectId, language, ...data });
  return await newProject.save();
}
```

#### Explicación:
1. **`getNextSequence`**: Incrementa el valor de `seq` en la colección `Counters` y devuelve el nuevo valor.
2. Combinas este `projectId` con el idioma para generar `_id`.

---

### **4. Manejo de Huecos al Eliminar**

Si necesitas rellenar huecos en los IDs, puedes implementar una estrategia manual. Por ejemplo, al eliminar un proyecto, puedes mantener un registro de IDs libres en tu colección `Counters` o una colección separada.

#### Al eliminar:
```javascript
async function deleteProject(_id) {
  const project = await Project.findByIdAndDelete(_id);
  if (project) {
    const [projectId, language] = _id.split('_');
    await Counter.updateOne(
      { _id: 'project' },
      { $push: { availableIds: parseInt(projectId, 10) } } // Guardar ID eliminado
    );
  }
}
```

#### Al crear un nuevo proyecto:
Comprueba si hay IDs disponibles antes de incrementar el contador.

```javascript
async function getNextAvailableProjectId() {
  const counter = await Counter.findById('project');

  if (counter.availableIds && counter.availableIds.length > 0) {
    return counter.availableIds.shift(); // Recuperar y eliminar el primer ID disponible
  } else {
    return await getNextSequence('project');
  }
}
```

---

### **Conclusión**

Este enfoque te permite:
1. **Control Total** sobre los **`_id`** generados.
2. **Evitar Duplicados**, ya sea con comprobaciones previas o reglas de negocio.
3. **Rellenar Huecos** al eliminar documentos, garantizando una secuencia ordenada.

¿Te gustaría un ejemplo más completo o una implementación específica para tu caso? 🚀