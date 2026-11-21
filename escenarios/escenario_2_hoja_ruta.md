# Escenario 2: La Hoja de Ruta Digital ⭐ (recomendado)

## 1. Cómo es el día hoy

Son las 8:00 en la bodega de una tienda de retail en **Puerto Montt**. **Carlos**, el repartidor, recibe **15 pedidos** para entregar en el día.

En la Evaluación 2, toda esa información quedó **repartida en Oracle**:

- Los datos de Carlos están en `usuario`.
- El camión está en `vehiculo`.
- La ruta está en `ruta`.
- Cada pedido está en `pedido`, con su `cliente`, su `direccion` y su `factura`.

Cuando Carlos abre la app para ver su día, el sistema tiene que **unir 7 a 10 tablas** con JOIN para armar una sola pantalla. Además, durante el recorrido pasan cosas que el modelo de tablas no tenía previstas:

- Un pinchazo de neumático.
- Un desvío por un corte de calle.
- Un cliente que pide dejar el paquete con el vecino.

Hoy todo eso **no se guarda en ninguna parte**, o queda como texto suelto.

## 2. Qué proponemos

Guardar cada **ruta del día** como **un solo documento** en MongoDB Atlas: la **Hoja de Ruta Digital**.

> 📄 Un documento = un repartidor + un camión + un día de trabajo, con todas sus paradas y todo lo que pasó.

- **Al empezar el día:** la app de Carlos descarga **un solo documento** y ya tiene todo.
- **Al terminar:** Logística abre **ese mismo documento** y ve cómo salió la ruta completa.

**Oracle no desaparece.** Sigue guardando usuarios, facturas y catálogos (lo formal y transaccional). MongoDB guarda la **operación del día**, que cambia y crece en terreno.

## 3. El documento

**Base de datos:** `reparto_db` · **Colección:** `hojas_ruta`
Código completo: [`codigo/documentos/escenario_2_hoja_ruta.js`](../codigo/documentos/escenario_2_hoja_ruta.js)

### Por qué cada parte está donde está

| Parte | Tipo | Por qué |
|---|---|---|
| `codigo_ruta`, `fecha`, `estado`, `km_recorridos`, `activa` | Campos simples | Texto, fecha, número y booleano |
| `repartidor` | Subdocumento | Siempre se lee junto con la ruta. Separarlo obligaría a un JOIN. |
| `vehiculo` | Subdocumento | Cada ruta tiene un solo camión. |
| `comunas` | Arreglo de textos | Una ruta pasa por varias comunas; se filtra con `$in` y `$all`. |
| `paradas` | Arreglo de subdocumentos | Una ruta puede tener 5 o 30 paradas. En SQL sería otra tabla más. |
| `incidentes` | Arreglo de subdocumentos | Algunas rutas no tienen ninguno y otras varios. En SQL ni siquiera existe esa tabla. |

## 4. El CRUD como un día de trabajo

| Hora | Qué pasa | Operación en MongoDB |
|---|---|---|
| 🌅 07:30 | Logística crea las hojas de ruta de los 8 repartidores | `insertMany` |
| 🚨 08:10 | Se suma una ruta extra por alta demanda | `insertOne` |
| 🔍 09:00 | Rutas que pasan por Alerce | `find({ comunas: { $in: ["Alerce"] } })` |
| 🔍 13:00 | Rutas con más de 30 km recorridos | `find({ km_recorridos: { $gte: 30 } })` + `sort` + `limit` |
| 🔍 15:00 | Rutas con alguna entrega fallida | `find({ "paradas.estado": "FALLIDO" })` |
| 📋 15:30 | ¿Qué tipos de camión salieron hoy? | `distinct("vehiculo.tipo")` |
| ✏️ 11:20 | Carlos avanza 12 km más | `updateOne` + `$inc: { km_recorridos: 12 }` |
| ✏️ 18:00 | Terminan todas las rutas del día | `updateMany` + `$set: { estado: "FINALIZADA" }` |
| ✏️ 18:05 | Se limpia el campo temporal `activa` | `$unset` |
| 🗑️ 19:00 | Se borra una ruta creada por error | `deleteOne` |
| 🗑️ 19:10 | Se borran las rutas de prueba | `deleteMany({ estado: "PRUEBA" })` |

## 5. Frase para la defensa

> "En Oracle, ver la ruta de Carlos exige unir el usuario, el vehículo, la ruta, los pedidos, los clientes y las direcciones: unas **7 tablas con JOIN**. En MongoDB es **un solo documento**. Además podemos guardar cosas que en Oracle ni siquiera tenían tabla, como los **incidentes del camino**."
