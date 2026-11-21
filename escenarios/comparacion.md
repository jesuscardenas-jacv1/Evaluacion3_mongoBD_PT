# Comparación de escenarios

| | [Escenario 1: Ficha del Pedido](escenario_1_ficha_pedido.md) | [Escenario 2: Hoja de Ruta](escenario_2_hoja_ruta.md) |
|---|---|---|
| Colección | `reparto_db.pedidos` | `reparto_db.hojas_ruta` |
| 1 documento es… | Un pedido | Una ruta completa del día |
| Fácil de explicar | ⭐⭐⭐ | ⭐⭐⭐⭐ (se cuenta como historia) |
| Anidación | Buena | Muy buena (paradas e incidentes) |
| Conexión con la Evaluación 2 | Directa (tabla `pedido`) | Directa (tabla `ruta` y `cerrar_rutas_completas`) |

## Recomendación: Escenario 2

- Se cuenta como la historia de un día de Carlos, el repartidor.
- Cada integrante puede defender un momento del día (crear, buscar, actualizar, eliminar).
- El arreglo `incidentes` es un buen argumento de por qué conviene NoSQL: en Oracle no existía una tabla para eso.

**Estado:** pendiente de decisión del equipo.
