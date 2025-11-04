// src/controllers/order.controller.js
const store = require("../db/store");

// POST /api/pedidos/checkout
exports.checkout = (req, res) => {
  const { productos } = req.body;
  if (!productos || !Array.isArray(productos) || productos.length === 0)
    return res.status(400).json({ ok: false, error: "Pedido vacío" });

  const id = store.ordenes.length + 1;
  const orden = {
    id,
    productos,
    estado: "Pendiente",
    fecha: new Date().toISOString(),
  };
  store.ordenes.push(orden);

  return res.status(201).json({ ok: true, orden });
};

// GET /api/pedidos/estado/:id
exports.estado = (req, res) => {
  const { id } = req.params;
  const orden = store.ordenes.find(o => o.id == id);
  if (!orden)
    return res.status(404).json({ ok: false, error: "Orden no encontrada" });
  return res.json({ ok: true, estado: orden.estado });
};