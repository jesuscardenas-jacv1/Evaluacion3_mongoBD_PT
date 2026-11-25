// EVALUACIÓN 3 · App de Gestión de Reparto
// Base de datos: reparto_db · Colección: rutas
// Jesús Cárdenas · Ramón Osorio · Lucas Saldivia
//
// Para ejecutar: seleccionar el bloque completo (use + consulta),
// clic derecho > "Run Selected Lines From Playground".


// ================= CREATE =================

// C1. Crear la base de datos y cargar las rutas del día (9 documentos)
use('reparto_db');   // si no existe, se crea al insertar
db.rutas.insertMany([
  {
    codigo: "R1", estado: "en_ruta", km: 42, activo: true, fecha: new Date(),
    repartidor: { nombre: "Pedro Muñoz", telefono: "987654321" },
    comunas: ["Puerto Montt", "Alerce"],
    paradas: [
      { cliente: "Ana Paz", monto: 30000, estado: "entregada" },
      { cliente: "Luis Rojas", monto: 25000, estado: "fallida", motivo: "cliente ausente" }
    ]
  },
  {
    codigo: "R2", estado: "en_ruta", km: 18, activo: true, fecha: new Date(),
    repartidor: { nombre: "Camila Díaz", telefono: "971234567" },
    comunas: ["Puerto Montt"],
    paradas: [ { cliente: "Rosa Vera", monto: 45000, estado: "entregada" } ]
  },
  {
    codigo: "R3", estado: "en_ruta", km: 27, activo: true, fecha: new Date(),
    nota: "revisar",
    repartidor: { nombre: "Valentina Ruiz", telefono: "953456789" },
    comunas: ["Alerce"],
    paradas: [ { cliente: "Raúl Mena", monto: 16000, estado: "fallida", motivo: "dirección incorrecta" } ]
  },
  {
    codigo: "R4", estado: "en_ruta", km: 39, activo: true, fecha: new Date(),
    repartidor: { nombre: "Matías Castro", telefono: "944567890" },
    comunas: ["Puerto Montt", "Puerto Varas"],
    paradas: [ { cliente: "Elena Barría", monto: 90000, estado: "entregada" } ]
  },
  {
    codigo: "R5", estado: "cancelada", km: 0, activo: false, fecha: new Date(),
    repartidor: { nombre: "Diego Fuentes", telefono: "935678901" },
    comunas: ["Puerto Montt"],
    paradas: []
  },
  {
    codigo: "R6", estado: "en_ruta", km: 22, activo: true, fecha: new Date(),
    repartidor: { nombre: "Javiera Lagos", telefono: "926789012" },
    comunas: ["Puerto Montt", "Alerce"],
    paradas: [ { cliente: "Pablo Silva", monto: 75000, estado: "entregada" } ]
  },
  {
    codigo: "R7", estado: "en_ruta", km: 31, activo: true, fecha: new Date(),
    repartidor: { nombre: "Tomás Vidal", telefono: "917890123" },
    comunas: ["Puerto Varas"],
    paradas: [ { cliente: "Gloria Paredes", monto: 60000, estado: "entregada" } ]
  },
  {
    codigo: "R8", estado: "prueba", km: 0, activo: false, fecha: new Date(),
    repartidor: { nombre: "Prueba", telefono: "000000000" },
    comunas: ["Puerto Montt"],
    paradas: []
  },
  {
    codigo: "R9", estado: "prueba", km: 0, activo: false, fecha: new Date(),
    repartidor: { nombre: "Prueba", telefono: "000000000" },
    comunas: ["Puerto Montt"],
    paradas: []
  }
]);

// C2. Agregar una ruta nueva
use('reparto_db');
db.rutas.insertOne({
  codigo: "R10", estado: "en_ruta", km: 0, activo: true, fecha: new Date(),
  repartidor: { nombre: "Sofía Vera", telefono: "908901234" },
  comunas: ["Puerto Varas"],
  paradas: [ { cliente: "Hugo Toro", monto: 22000, estado: "pendiente" } ]
});


// ================= READ =================

// L1. Buscar la ruta de Pedro, ocultando el _id   -> R1
use('reparto_db');
db.rutas.find({ "repartidor.nombre": "Pedro Muñoz" }, { _id: 0 });

// L2. Rutas con una entrega fallida   -> R1 y R3
use('reparto_db');
db.rutas.find({ "paradas.estado": "fallida" });

// L3. Rutas entre 20 y 40 km   -> R3, R4, R6 y R7
use('reparto_db');
db.rutas.find({ km: { $gte: 20, $lte: 40 } });

// L4. Rutas que pasan por Alerce o Puerto Varas   -> R1, R3, R4, R6, R7 y R10
use('reparto_db');
db.rutas.find({ comunas: { $in: ["Alerce", "Puerto Varas"] } });

// L5. Rutas que pasan por Puerto Montt y también por Alerce   -> R1 y R6
use('reparto_db');
db.rutas.find({ comunas: { $all: ["Puerto Montt", "Alerce"] } });

// L6. Rutas que no van a Puerto Montt   -> R3, R7 y R10
use('reparto_db');
db.rutas.find({ comunas: { $nin: ["Puerto Montt"] } });

// L7. Rutas canceladas o inactivas   -> R5, R8 y R9
use('reparto_db');
db.rutas.find({ $or: [ { estado: "cancelada" }, { activo: false } ] });

// L8. Las 3 rutas con más km   -> R1, R4 y R7
use('reparto_db');
db.rutas.find().sort({ km: -1 }).limit(3);

// L9. ¿Qué estados existen?   -> cancelada, en_ruta, prueba
use('reparto_db');
db.rutas.distinct("estado");


// ================= UPDATE =================

// U1. Pedro avanzó 5 km más   -> modifica 1 (42 pasa a 47)
use('reparto_db');
db.rutas.updateOne({ codigo: "R1" }, { $inc: { km: 5 } });

// U2. Pedro terminó su ruta   -> modifica 1
use('reparto_db');
db.rutas.updateOne({ codigo: "R1" }, { $set: { estado: "finalizada" } });

// U3. Terminan todas las rutas que seguían en la calle   -> modifica 6
use('reparto_db');
db.rutas.updateMany({ estado: "en_ruta" }, { $set: { estado: "finalizada" } });

// U4. Quitar la nota temporal de la ruta R3   -> modifica 1
use('reparto_db');
db.rutas.updateOne({ codigo: "R3" }, { $unset: { nota: "" } });


// ================= DELETE =================

// D1. Borrar la ruta cancelada   -> borra 1
use('reparto_db');
db.rutas.deleteOne({ codigo: "R5" });

// D2. Borrar las rutas de prueba   -> borra 2
use('reparto_db');
db.rutas.deleteMany({ estado: "prueba" });

// D3. ¿Cuántas rutas quedaron?   -> 7
use('reparto_db');
db.rutas.countDocuments();
