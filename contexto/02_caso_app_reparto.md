# Nuestro caso: App de Gestión de Reparto para Retail

**Equipo:** Jesús Cárdenas, Ramón Osorio, Lucas Saldivia · Puerto Montt
**Viene de:** Evaluación 2 (Oracle PL/SQL) — informe "App de Gestión de Reparto para Retail".

## El proyecto

Una aplicación móvil para gestionar el reparto de empresas de retail, con backend en la nube. Centraliza la asignación de rutas, las facturas y la confirmación de entregas con geolocalización y foto.

## El problema del negocio

La alta demanda de pedidos supera lo que el personal puede controlar a mano:

- Cada repartidor informa la entrega **a su manera**; no hay un formato común.
- Los fallos quedan **sin motivo claro**: la causa se escribe en texto libre o no se registra.
- Los avisos al cliente son **manuales, tardíos y con errores**.

Resultado: entregas fallidas, clientes insatisfechos y costos operativos altos. Afecta a **Logística** (no sabe qué rutas terminaron), a los **repartidores** (sin validación en terreno) y a los **clientes** (sin información de su pedido).

## Lo que hicimos en la Evaluación 2 (Oracle)

**13 tablas:**

| Grupo | Tablas |
|---|---|
| Catálogos | `rol`, `estado_pedido`, `estado_ruta`, `estado_notificacion` |
| Personas y equipos | `usuario`, `dispositivo`, `vehiculo` |
| Clientes | `cliente`, `direccion` |
| Operación | `ruta`, `pedido` (tabla central), `factura` |
| Seguimiento | `comentario`, `notificacion`, `reagendamiento` |

**Package `pkg_reparto`:**

| Objeto | Tipo | Qué hace |
|---|---|---|
| `registrar_entrega` | Procedimiento | Registra una entrega LOGRADA o FALLIDA validando la razón del fallo |
| `cerrar_rutas_completas` | Procedimiento | Pasa a FINALIZADA las rutas sin pedidos pendientes |
| `contar_pedidos_fallidos` | Función | Cuántas entregas fallaron en una ruta |
| `total_pedidos_en_ruta` | Función | Cuántos pedidos siguen en ruta |

Más triggers de fila y de sentencia (avisos automáticos al cliente), un `VARRAY` con las razones de fallo y un `RECORD` en el cursor maestro-detalle.

**Tecnologías:** Oracle Database, PL/SQL, Oracle SQL Developer, GitHub, Claude (IA).

## Por qué ahora MongoDB

Para armar en Oracle la vista completa de un pedido o de una ruta hay que unir **7 a 10 tablas con JOIN**:

```
pedido ─ cliente ─ direccion
   │
   ├─ ruta ─ usuario (operario) ─ vehiculo
   ├─ estado_pedido
   ├─ factura ─ comentario
   ├─ notificacion
   └─ reagendamiento
```

Además, en terreno pasan cosas que el modelo de tablas no tenía previstas (incidentes del camino, varias fotos, varios reagendamientos). En MongoDB todo eso cabe en **un solo documento** que crece cuando lo necesita.

> **Mensaje clave para la defensa:** MongoDB **no reemplaza** a Oracle. **Conviven**: Oracle sigue con lo formal y transaccional (usuarios, catálogos, facturación) y MongoDB guarda la ficha que la app consulta todo el día.
