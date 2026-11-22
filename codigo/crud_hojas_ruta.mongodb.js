// ============================================================
// EVALUACIÓN 3 · HOJA DE RUTA DIGITAL — SCRIPT CRUD
// Base de datos: reparto_db · Colección: hojas_ruta
// Equipo: Jesús Cárdenas · Ramón Osorio · Lucas Saldivia · Sección 004V
//
// Cómo usarlo en VS Code (extensión MongoDB for VS Code):
//   1. Conectarse al cluster de MongoDB Atlas.
//   2. Abrir este archivo (es un Playground).
//   3. Seleccionar UN bloque y usar "Run Selected Lines From Playground"
//      (clic derecho), para ver el resultado de cada consulta por separado.
//   El orden de los bloques es el mismo de la presentación:
//   Create → Read → Update → Delete. Datos ficticios.
// ============================================================

use('reparto_db');

// Deja la colección vacía para que el script se pueda repetir desde cero.
db.hojas_ruta.drop();


// ============================================================
// C · CREATE
// ============================================================

// 07:30 · Logística carga el lote del día: 10 rutas
//         (7 en curso, 1 cancelada y 2 de prueba)
db.hojas_ruta.insertMany([
  {
    codigo_ruta: "HR-2026-11-21-01",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 18,
    activa: true,
    repartidor: { nombre: "Camila Díaz", rut: "17.345.678-9", telefono: "+56 9 7123 4567" },
    vehiculo: { patente: "HJKL-12", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Puerto Montt"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1010", cliente: "Rosa Muñoz", direccion: "Urmeneta 480", monto: 45990, estado: "ENTREGADO" },
      { orden: 2, codigo_pedido: "PED-1011", cliente: "Felipe Arce", direccion: "Benavente 920", monto: 12990, estado: "PENDIENTE" }
    ],
    incidentes: []
  },
  {
    codigo_ruta: "HR-2026-11-21-02",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 35,
    activa: true,
    repartidor: { nombre: "Jorge Pérez", rut: "15.987.654-3", telefono: "+56 9 6234 5678" },
    vehiculo: { patente: "PRTZ-88", tipo: "Camión", capacidad_kg: 3500 },
    comunas: ["Puerto Montt", "Puerto Varas"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1020", cliente: "Marta Leiva", direccion: "San Pedro 311", monto: 349990, estado: "ENTREGADO" },
      { orden: 2, codigo_pedido: "PED-1021", cliente: "Hugo Toro", direccion: "Del Salvador 77", monto: 219990, estado: "ENTREGADO" }
    ],
    incidentes: [
      { tipo: "DESVIO", hora: "10:05", detalle: "Corte de calle en Ruta 5, 15 min extra" }
    ]
  },
  {
    codigo_ruta: "HR-2026-11-21-03",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 27,
    activa: true,
    repartidor: { nombre: "Valentina Ruiz", rut: "19.111.222-3", telefono: "+56 9 5345 6789" },
    vehiculo: { patente: "GTRW-34", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Alerce"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1030", cliente: "Claudia Vega", direccion: "Los Alerces 1200", monto: 59990, estado: "ENTREGADO" },
      { orden: 2, codigo_pedido: "PED-1031", cliente: "Raúl Mena", direccion: "Pasaje 4, casa 18", monto: 15990, estado: "FALLIDO", razon_fallo: "DIRECCION_INCORRECTA" },
      { orden: 3, codigo_pedido: "PED-1032", cliente: "Sara Ojeda", direccion: "Av. Alerce Sur 455", monto: 38990, estado: "PENDIENTE" }
    ],
    incidentes: []
  },
  {
    codigo_ruta: "HR-2026-11-21-04",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 39,
    activa: true,
    repartidor: { nombre: "Matías Castro", rut: "16.555.444-K", telefono: "+56 9 4456 7890" },
    vehiculo: { patente: "BCDF-56", tipo: "Camión", capacidad_kg: 3500 },
    comunas: ["Puerto Montt", "Alerce", "Puerto Varas"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1040", cliente: "Elena Barría", direccion: "Egaña 150", monto: 499990, estado: "ENTREGADO" },
      { orden: 2, codigo_pedido: "PED-1041", cliente: "Iván Oyarzo", direccion: "Los Carreras 902", monto: 129990, estado: "ENTREGADO" },
      { orden: 3, codigo_pedido: "PED-1042", cliente: "Nora Cárcamo", direccion: "Santa Rosa 66", monto: 89990, estado: "PENDIENTE" }
    ],
    incidentes: []
  },
  {
    codigo_ruta: "HR-2026-11-21-05",
    fecha: new Date("2026-11-21"),
    estado: "CANCELADA",            // el repartidor quedó con licencia médica
    km_recorridos: 0,
    activa: false,
    repartidor: { nombre: "Diego Fuentes", rut: "18.222.333-4", telefono: "+56 9 3567 8901" },
    vehiculo: { patente: "KLMN-78", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Puerto Montt"],
    paradas: [],
    incidentes: []
  },
  {
    codigo_ruta: "HR-2026-11-21-06",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 22,
    activa: true,
    repartidor: { nombre: "Javiera Lagos", rut: "17.888.999-0", telefono: "+56 9 2678 9012" },
    vehiculo: { patente: "WXYZ-90", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Alerce", "Puerto Montt"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1060", cliente: "Pablo Silva", direccion: "Av. Presidente Ibáñez 600", monto: 74990, estado: "ENTREGADO" }
    ],
    incidentes: [
      { tipo: "ENTREGA_VECINO", hora: "12:40", detalle: "El cliente pidió dejarlo con el vecino del 602" }
    ]
  },
  {
    codigo_ruta: "HR-2026-11-21-07",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 42,
    activa: true,
    repartidor: { nombre: "Pedro Muñoz", rut: "18.456.789-0", telefono: "+56 9 8765 4321" },
    vehiculo: { patente: "KJTR-45", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Puerto Montt", "Alerce"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1001", cliente: "Ana Paz", direccion: "Av. Angelmó 1520", monto: 89990, estado: "ENTREGADO" },
      { orden: 2, codigo_pedido: "PED-1002", cliente: "Luis Rojas", direccion: "Los Notros 233", monto: 25000, estado: "FALLIDO", razon_fallo: "CLIENTE_AUSENTE" }
    ],
    incidentes: [
      { tipo: "PINCHAZO", hora: "11:20", detalle: "Rueda trasera, 25 min detenido" }
    ]
  },
  {
    codigo_ruta: "HR-2026-11-21-08",
    fecha: new Date("2026-11-21"),
    estado: "EN_CURSO",
    km_recorridos: 31,
    activa: true,
    repartidor: { nombre: "Tomás Vidal", rut: "16.777.666-5", telefono: "+56 9 1789 0123" },
    vehiculo: { patente: "QRST-23", tipo: "Camión", capacidad_kg: 3500 },
    comunas: ["Puerto Varas"],
    paradas: [
      { orden: 1, codigo_pedido: "PED-1080", cliente: "Gloria Paredes", direccion: "Del Rosario 410", monto: 159990, estado: "ENTREGADO" }
    ],
    incidentes: []
  },
  {
    codigo_ruta: "HR-PRUEBA-01",
    fecha: new Date("2026-11-21"),
    estado: "PRUEBA",
    km_recorridos: 0,
    activa: false,
    repartidor: { nombre: "Usuario de prueba", rut: "11.111.111-1", telefono: "+56 9 0000 0000" },
    vehiculo: { patente: "TEST-01", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Puerto Montt"],
    paradas: [],
    incidentes: []
  },
  {
    codigo_ruta: "HR-PRUEBA-02",
    fecha: new Date("2026-11-21"),
    estado: "PRUEBA",
    km_recorridos: 0,
    activa: false,
    repartidor: { nombre: "Usuario de prueba", rut: "11.111.111-1", telefono: "+56 9 0000 0000" },
    vehiculo: { patente: "TEST-02", tipo: "Furgón", capacidad_kg: 800 },
    comunas: ["Puerto Montt"],
    paradas: [],
    incidentes: []
  }
]);
// → { acknowledged: true, insertedIds: { '0': ..., '9': ... } }

// 08:10 · Se suma una ruta extra a Puerto Varas por alta demanda
db.hojas_ruta.insertOne({
  codigo_ruta: "HR-2026-11-21-09",
  fecha: new Date("2026-11-21"),
  estado: "EN_CURSO",
  km_recorridos: 0,
  activa: true,
  repartidor: { nombre: "Sofía Vera", rut: "19.234.567-8" },
  vehiculo: { patente: "LXBP-21", tipo: "Camión", capacidad_kg: 3500 },
  comunas: ["Puerto Varas"],
  paradas: [ { orden: 1, codigo_pedido: "PED-1090", estado: "PENDIENTE" } ],
  incidentes: []
});
// → { acknowledged: true, insertedId: ObjectId('...') }


// ============================================================
// R · READ (1/2) · filtros con operadores
// ============================================================

// 09:00 · Rutas que pasan por Alerce ($in)
db.hojas_ruta.find({ comunas: { $in: ["Alerce"] } });
// → rutas 03, 04, 06 y 07

// 09:30 · Rutas que cubren Puerto Montt y también Alerce ($all)
db.hojas_ruta.find({ comunas: { $all: ["Puerto Montt", "Alerce"] } });
// → rutas 04, 06 y 07

// 10:00 · Rutas que no van a Puerto Varas ($nin)
db.hojas_ruta.find({ comunas: { $nin: ["Puerto Varas"] } });
// → rutas 01, 03, 05, 06, 07 y las 2 de prueba

// 13:00 · Rutas que llevan entre 20 y 40 km ($gte y $lte)
db.hojas_ruta.find({ km_recorridos: { $gte: 20, $lte: 40 } });
// → rutas 02, 03, 04, 06 y 08

// 14:00 · Rutas con un pinchazo o que van atrasadas ($or)
db.hojas_ruta.find({ $or: [
  { "incidentes.tipo": "PINCHAZO" },
  { estado: "ATRASADA" }
] });
// → ruta 07 (Pedro)


// ============================================================
// R · READ (2/2) · subdocumentos, proyección, sort, limit, distinct
// ============================================================

// 15:00 · Rutas con alguna entrega fallida (dentro del arreglo paradas)
db.hojas_ruta.find({ "paradas.estado": "FALLIDO" });
// → rutas 03 y 07

// 15:10 · Rutas hechas en furgón (dentro del subdocumento vehiculo)
db.hojas_ruta.find({ "vehiculo.tipo": "Furgón" });

// 15:20 · Las 3 rutas más largas, solo con los campos necesarios y sin _id
db.hojas_ruta.find(
  { },
  { _id: 0, codigo_ruta: 1, "repartidor.nombre": 1, km_recorridos: 1 }
).sort({ km_recorridos: -1 }).limit(3);
// → 07 Pedro Muñoz (42), 04 Matías Castro (39), 02 Jorge Pérez (35)

// 15:30 · ¿Qué tipos de vehículo salieron hoy?
db.hojas_ruta.distinct("vehiculo.tipo");
// → [ "Camión", "Furgón" ]

// Ojo: esto NO encuentra la parada, porque busca un subdocumento
// exactamente igual a { estado: "FALLIDO" } (sin los demás campos):
db.hojas_ruta.find({ paradas: { estado: "FALLIDO" } });
// → sin resultados. Por eso se usa la notación con punto "paradas.estado".


// ============================================================
// U · UPDATE
// ============================================================

// 11:20 · Pedro avanza 12 km más ($inc)
db.hojas_ruta.updateOne(
  { codigo_ruta: "HR-2026-11-21-07" },
  { $inc: { km_recorridos: 12 } }
);
// → { matchedCount: 1, modifiedCount: 1 }   (42 → 54 km)

// 11:25 · El pinchazo lo deja atrasado ($set)
db.hojas_ruta.updateOne(
  { codigo_ruta: "HR-2026-11-21-07" },
  { $set: { estado: "ATRASADA" } }
);
// → { matchedCount: 1, modifiedCount: 1 }

// 18:00 · Terminan todas las rutas del día (updateMany + $set)
db.hojas_ruta.updateMany(
  { estado: { $in: ["EN_CURSO", "ATRASADA"] } },
  { $set: { estado: "FINALIZADA" } }
);
// → { matchedCount: 8, modifiedCount: 8 }   (no toca la cancelada ni las de prueba)

// 18:05 · Se limpia el campo temporal activa ($unset)
db.hojas_ruta.updateMany({ estado: "FINALIZADA" }, { $unset: { activa: "" } });
// → { matchedCount: 8, modifiedCount: 8 }


// ============================================================
// D · DELETE
// ============================================================

// 19:00 · Se borra la ruta cancelada (código único + estado)
db.hojas_ruta.deleteOne({ codigo_ruta: "HR-2026-11-21-05", estado: "CANCELADA" });
// → { acknowledged: true, deletedCount: 1 }

// 19:10 · Primero revisamos qué rutas de prueba hay
db.hojas_ruta.find({ estado: "PRUEBA" }, { _id: 0, codigo_ruta: 1 });
// → HR-PRUEBA-01 y HR-PRUEBA-02

// 19:12 · Y luego borramos solo esas
db.hojas_ruta.deleteMany({ estado: "PRUEBA" });
// → { acknowledged: true, deletedCount: 2 }

// Resultado final: quedan las 8 rutas reales del día, todas FINALIZADA.
db.hojas_ruta.countDocuments();
// → 8
