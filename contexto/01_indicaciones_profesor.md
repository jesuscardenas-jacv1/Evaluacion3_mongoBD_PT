# Indicaciones del profesor — Evaluación Parcial N° 3

Fuentes: lo que explicó el profesor en clase y la presentación "Sesión 6: Guía Evaluación 3 (Informe, Defensa y Taller)" de la plataforma docente.

## 1. Ponderación

| Parte | Peso | Modalidad |
|---|---|---|
| Quiz formativo | 30% | Individual · ya rendido ✅ |
| Informe escrito | 10% | En equipo (máx. 3) |
| Defensa oral | **60%** | Nota **individual** |

## 2. Qué hay que hacer

Elegir un **caso de negocio**, diseñar **1 colección bien completa** en su propio **cluster de MongoDB Atlas** y demostrar cómo se maneja con **CRUD**.

- **C**reate → insertar
- **R**ead → buscar (equivale al `SELECT`)
- **U**pdate → actualizar
- **D**elete → eliminar

**Herramientas:** MongoDB Atlas + VS Code (Playground con archivo `.mongodb.js`).

**Tema:** se recomienda **continuar el proyecto** de las evaluaciones 1 y 2, porque el Examen Transversal (ET) debe ser su continuación. Si eligen tema libre, en el ET tendrán que volver al proyecto inicial.

## 3. La colección

- Basta con **1 colección**, pero bien diseñada.
- ❌ Nada de documentos planos de solo clave-valor de texto.
- ✅ Debe tener:
  - campos simples de varios tipos: **texto, número, booleano y fecha** (`new Date()`)
  - **subdocumentos** `{ }`
  - **arreglos de textos** `[ "..." ]`
  - **arreglos de subdocumentos** `[ { } ]`
- Hay que **justificar cada campo**: por qué tiene ese valor y por qué va anidado así.

### Documento modelo del profesor

```js
{
  "codigo_ficha": "ORD-101",
  "estado": "en_proceso",                       // cambia con $set
  "monto_total": 45000,                         // se ajusta con $inc
  "activo": true,                               // booleano para filtrar
  "cliente": { "nombre": "Ana Paz", "comuna": "Ñuñoa" },        // SUBDOCUMENTO
  "etiquetas": ["urgente", "convenio", "web"],                   // ARREGLO de textos
  "items": [                                                     // ARREGLO de subdocumentos
    { "servicio": "Consulta General", "costo": 25000 },
    { "servicio": "Examen Laboratorio", "costo": 20000 }
  ],
  "fecha_creacion": new Date()
}
```

Para buscar el ítem que cuesta 20000:

```js
db.coleccion.find({ "items.costo": 20000 })     // algún ítem cuesta 20000
db.coleccion.find({ "items.1.costo": 20000 })   // el ítem de la posición 1 (el índice parte en 0)
```

> ⚠️ `find({ items: { costo: 20000 } })` solo encuentra el subdocumento si es **exactamente** igual. Usar la notación con punto.

## 4. Operaciones CRUD que deben mostrar en vivo

| Operación | Qué mostrar |
|---|---|
| **Create** | `insertOne()` (1 ficha) e `insertMany()` (lote de **8 a 10** documentos variados) |
| **Read** | `find()` con `$gte`, `$lte`, `$in`, `$all`, `$nin`, `$or`, búsqueda en **subdocumentos**, **proyección** (`_id: 0`), `sort()`, `limit()`, `distinct()` |
| **Update** | `updateOne()`, `updateMany()`, `$set` (estados), `$inc` (sumar/restar), `$unset` (limpiar campos) |
| **Delete** | `deleteOne()` y `deleteMany()` con condiciones de negocio seguras (ej. registros cancelados o de prueba) |

## 5. Informe (10%)

1. **Introducción:** de qué trata el negocio, qué problema resuelve y qué tecnologías usa.
2. **Relacional vs. no relacional:** diferencias, ventajas, desventajas y cuándo conviene SQL (Oracle) o NoSQL (MongoDB). NoSQL = **"Not Only SQL"**.
3. **Modelo documental:** por qué lo eligieron y la estructura detallada de la colección y sus campos.
4. **Operaciones CRUD:** código y capturas de `insert`, `find`, `update` y `delete`.
5. **Conclusión:** cómo aporta valor la colección al negocio y qué mejoras harían a futuro.
6. **Anexos:** el script `.mongodb.js` completo y el esquema o diagrama del documento.

## 6. Defensa (60% · individual)

| Punto | Peso en la rúbrica |
|---|---|
| 1. El problema y los datos | (no indicado) |
| 2. SQL vs NoSQL: por qué un documento en vez de varias tablas con JOIN | 20% |
| 3. Justificar el documento: mostrar el JSON y explicar arreglos y subdocumentos | 20% |
| 4. Explicar el CRUD | 20% |

> La diapositiva dice "5 puntos" pero muestra 4. **Preguntar al profesor** qué evalúa el punto 5 y el 40% restante.

Cada integrante puede presentar un caso de uso ("Profesor, este es el caso, ejecutamos y vemos el resultado").

## 7. Lo que NO deben hacer

- ❌ Diapositivas llenas de texto copiado del informe.
- ❌ Capturas de código gigantes con letra ilegible.
- ❌ "Yo hice el informe, mi compañero hizo el código". **Todos deben dominar todo**: el profesor puede hacer la misma pregunta a cada uno.
- ❌ Un documento plano de 3 campos sin arreglos ni objetos.

## 8. Lo que SÍ esperan ver

- Pocas palabras por diapositiva: ideas visuales y directas.
- El documento JSON **en grande**, mostrando su estructura.
- Código CRUD limpio y enfocado en casos reales del negocio.
- Todos los integrantes saben explicar cualquier consulta.

## 9. Preguntas para que el profesor apruebe el diseño

**Parte 1 — el caso**
1. ¿Qué negocio vamos a trabajar?
2. ¿Cuál es la "ficha principal" que el negocio consulta todo el día?
3. ¿Por qué esa ficha sería incómoda de armar en tablas SQL? ¿Cuántas tablas y JOIN necesitarían?

**Parte 2 — el documento**
1. Nombre de la base de datos y de la colección.
2. Campos simples (4 o 5) y su tipo.
3. ¿Qué irá en un subdocumento `{ }`?
4. ¿Qué irá en un arreglo `[ ]`?
5. ¿Qué cambios reales sufrirá el documento? (`$inc`, `$set`, `$unset`)

**Meta de la clase:** dejar definida la estructura, probar un primer `insertOne()` en el Playground y llamar al profesor para validarla.
