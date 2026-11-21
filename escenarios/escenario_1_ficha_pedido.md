# Escenario 1: La Ficha del Pedido

## La idea

El repartidor está en terreno con el celular, a veces con mala señal. Para ver una sola parada, la app hoy necesita unir unas **10 tablas** en Oracle (pedido, cliente, dirección, ruta, vehículo, operario, factura, comentarios, notificaciones y reagendamientos).

**Solución:** cada pedido vive como **un solo documento** en MongoDB Atlas. La app lo descarga de una vez, con todo lo que el repartidor necesita, y va guardando lo que pasa en la entrega.

**¿Por qué no solo Oracle?** Porque esta información cambia de forma según el caso: un pedido puede tener 1 foto o 5, 0 o 3 reagendamientos, firma o no. En SQL eso obliga a tablas nuevas o columnas vacías; en MongoDB el documento simplemente crece.

## El documento

**Base de datos:** `reparto_db` · **Colección:** `pedidos`
Código completo: [`codigo/documentos/escenario_1_pedido.js`](../codigo/documentos/escenario_1_pedido.js)

| Parte | Tipo | Por qué |
|---|---|---|
| `codigo_pedido`, `estado`, `monto_total`, `intentos_entrega`, `prioritario`, `fecha_creacion` | Campos simples | Texto, número, booleano y fecha |
| `cliente` (con `direccion` adentro) | Subdocumento anidado | Siempre se lee junto con el pedido |
| `ruta` | Subdocumento | Un pedido va en una sola ruta |
| `entrega` | Subdocumento | Reemplaza a la tabla `factura` (resultado, razón, foto, geolocalización) |
| `etiquetas` | Arreglo de textos | Se filtra con `$in`, `$all`, `$nin` |
| `productos`, `notificaciones`, `comentarios`, `reagendamientos` | Arreglos de subdocumentos | Su cantidad varía de un pedido a otro |

## El CRUD como un día de reparto

| Hora | Qué pasa | Operación |
|---|---|---|
| 08:00 | El ejecutivo carga los pedidos del día | `insertMany` (8 a 10 pedidos) |
| 08:15 | Llega una venta urgente | `insertOne` |
| 09:00 | El repartidor revisa su ruta ordenada | `find` por ruta + `sort` + `limit` + proyección `_id: 0` |
| 09:05 | Logística filtra alto valor, frágiles y comunas | `$gte`, `$lte`, `$in`, `$all`, `$nin`, `$or`, `cliente.direccion.comuna`, `distinct` |
| 09:10 | Sale el camión: todos pasan a EN_RUTA | `updateMany` + `$set` |
| 11:30 | Entrega fallida: cliente ausente | `updateOne` + `$set` (estado y razón) + `$inc` (`intentos_entrega`) |
| 14:00 | El cliente reagenda | `$unset` de `entrega.razon_fallo` + `$set` estado REAGENDADO |
| 18:00 | Un cliente anula su compra | `deleteOne` |
| 18:30 | Limpieza de pedidos de prueba o cancelados | `deleteMany` |

## Frase para la defensa

> "Para mostrar una parada al repartidor, Oracle necesita unir unas 10 tablas. MongoDB la entrega en una sola lectura."
