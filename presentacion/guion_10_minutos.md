# Guion: 10 minutos (5 de láminas + 5 en vivo)

El reparto de integrantes es una propuesta. Todos deben poder explicar cualquier consulta: la nota es individual.

## Láminas (5 minutos)

| Tiempo | Lámina | Quién | Idea para decir |
|---|---|---|---|
| 0:00 – 0:20 | Portada | Jesús | Presentar al equipo y el proyecto |
| 0:20 – 1:20 | Introducción | Jesús | Hay más pedidos de los que se controlan a mano. Guardamos cada ruta en un documento |
| 1:20 – 2:30 | SQL y NoSQL | Ramón | En Oracle la ruta de Pedro une 7 tablas. En MongoDB es 1 documento. Conviven |
| 2:30 – 3:50 | Modelo documental | Lucas | Un repartidor es `{ }`. Varias comunas es `[ ]`. Varias paradas es `[ { } ]` |
| 3:50 – 4:30 | CRUD | Jesús | Cuatro operaciones y pasamos a VS Code |

Dejar la última lámina (Conclusión) para el cierre.

## Demo en vivo (4:30 – 9:15)

Archivo: `codigo/demo/1_demo.mongodb.js`. Seleccionar el bloque (`use` y la consulta), clic derecho, **Run Selected Lines From Playground**.

| Tiempo | Quién | Bloques |
|---|---|---|
| 4:30 – 5:15 | Jesús | C1, C2 |
| 5:15 – 7:20 | Ramón | L1 a L9 (unos 14 segundos cada una) |
| 7:20 – 9:00 | Lucas | U1 a U4, D1 a D3 |
| 9:00 – 9:40 | Jesús | Lámina Conclusión |

Si falta tiempo, saltar L6 y L9. Con la tecla **T** la presentación muestra un cronómetro (se pone rojo a los 9 minutos).

## Qué significa cada palabra

| Código | Significa |
|---|---|
| `use` | Elige la base de datos. Si no existe, se crea al insertar |
| `$gte` / `$lte` | Mayor o igual / menor o igual |
| `$in` | Tiene alguno de estos valores |
| `$all` | Tiene todos estos valores |
| `$nin` | No tiene ninguno de estos valores |
| `$or` | Se cumple una condición o la otra |
| `{ _id: 0 }` | Proyección: oculta el `_id` |
| `sort({ km: -1 })` | Ordena de mayor a menor |
| `limit(3)` | Muestra solo 3 |
| `distinct` | Lista los valores sin repetir |
| `$set` / `$inc` / `$unset` | Cambia / suma / quita un campo |

## Preguntas probables

- **¿Por qué `"paradas.estado"` lleva comillas y punto?** Porque entra a un campo que está dentro de otro.
- **¿Por qué el repartidor va dentro de la ruta?** Porque siempre se leen juntos y así no hace falta un JOIN.
- **¿Qué desventaja tiene?** El nombre del repartidor se repite en cada ruta.
- **¿Cuál es la diferencia entre `updateOne` y `updateMany`?** El primero cambia un documento. El segundo, todos los que cumplen la condición.
- **¿Por qué no se usa `deleteMany({})` en la demo?** Porque borra toda la colección.

## Antes de presentar

1. Conectar VS Code al cluster con la red de la sala. Si no conecta: Atlas > Network Access > Add Current IP Address.
2. Tener listo el internet del celular como respaldo.
3. Ensayar toda la demo una vez y sacar capturas de los resultados (sirven para el informe y de respaldo).
4. Ejecutar `codigo/demo/0_reiniciar.mongodb.js` **después** del ensayo. Si se olvida, C1 duplica los datos.
5. Subir la letra de VS Code con Ctrl y +.
6. Abrir `presentacion/presentacion_final.html` y presionar F (pantalla completa).
