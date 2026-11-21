// ============================================================
// ESCENARIO 1 — FICHA DEL PEDIDO
// Base de datos: reparto_db · Colección: pedidos
// Documento de ejemplo (diseño). Todavía NO es el script CRUD.
// Datos ficticios.
// ============================================================

const pedidoEjemplo = {
  codigo_pedido: "PED-1001",                 // texto: identificador de negocio
  estado: "EN_RUTA",                         // texto: cambia con $set
  monto_total: 89990,                        // número
  intentos_entrega: 1,                       // número: sube con $inc
  prioritario: true,                         // booleano para filtrar
  fecha_creacion: new Date(),                // fecha BSON

  cliente: {                                 // SUBDOCUMENTO
    nombre: "Ana Paz",
    telefono: "+56 9 1234 5678",
    email: "ana.paz@correo.cl",
    direccion: {                             // subdocumento dentro de otro subdocumento
      comuna: "Puerto Montt",
      calle: "Av. Angelmó",
      numero: "1520",
      referencia: "Portón verde"
    }
  },

  ruta: {                                    // SUBDOCUMENTO
    codigo: "R-07",
    operario: "Pedro Muñoz",
    vehiculo: "FURGON-02"
  },

  etiquetas: ["fragil", "express"],          // ARREGLO de textos ($in, $all, $nin)

  productos: [                               // ARREGLO de subdocumentos
    { sku: "TV-55",  nombre: "Smart TV 55",  cantidad: 1, precio: 79990 },
    { sku: "SOP-01", nombre: "Soporte muro", cantidad: 1, precio: 10000 }
  ],

  entrega: {                                 // SUBDOCUMENTO (reemplaza a la tabla factura)
    resultado: null,                         // "LOGRADO" | "FALLIDO"
    razon_fallo: null,                       // se limpia con $unset al reagendar
    foto_url: null,
    geolocalizacion: null
  },

  notificaciones: [                          // ARREGLO de subdocumentos
    { tipo: "EMAIL", estado: "ENVIADA", fecha: new Date() }
  ],
  comentarios: [],                           // ARREGLO de subdocumentos
  reagendamientos: []                        // ARREGLO de subdocumentos
};
