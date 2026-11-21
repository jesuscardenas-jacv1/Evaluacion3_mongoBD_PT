// ============================================================
// ESCENARIO 2 — HOJA DE RUTA DIGITAL (recomendado)
// Base de datos: reparto_db · Colección: hojas_ruta
// Documento de ejemplo (diseño). Todavía NO es el script CRUD.
// Datos ficticios.
// ============================================================

const hojaRutaEjemplo = {
  codigo_ruta: "HR-2026-11-21-07",           // texto: identificador
  fecha: new Date("2026-11-21"),             // fecha
  estado: "EN_CURSO",                        // texto: cambia con $set
  km_recorridos: 42,                         // número: sube con $inc
  activa: true,                              // booleano: se limpia con $unset

  repartidor: {                              // SUBDOCUMENTO
    nombre: "Pedro Muñoz",
    rut: "18.456.789-0",
    telefono: "+56 9 8765 4321"
  },

  vehiculo: {                                // SUBDOCUMENTO
    patente: "KJTR-45",
    tipo: "Furgón",
    capacidad_kg: 800
  },

  comunas: ["Puerto Montt", "Alerce"],       // ARREGLO de textos ($in, $all, $nin)

  paradas: [                                 // ARREGLO de subdocumentos
    {
      orden: 1,
      codigo_pedido: "PED-1001",
      cliente: "Ana Paz",
      direccion: "Av. Angelmó 1520",
      monto: 89990,
      estado: "ENTREGADO"
    },
    {
      orden: 2,
      codigo_pedido: "PED-1002",
      cliente: "Luis Rojas",
      direccion: "Los Notros 233",
      monto: 25000,
      estado: "FALLIDO",
      razon_fallo: "CLIENTE_AUSENTE"
    }
  ],

  incidentes: [                              // ARREGLO de subdocumentos
    { tipo: "PINCHAZO", hora: "11:20", detalle: "Rueda trasera, 25 min detenido" }
  ]
};
