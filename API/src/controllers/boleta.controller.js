// src/controllers/boleta.controller.js
const store = require("../db/store");

// POST /api/boletas
exports.generar = (req, res) => {
  const { ordenId } = req.body;
  const orden = store.ordenes.find(o => o.id == ordenId);
  if (!orden)
    return res.status(404).json({ ok: false, error: "Orden no encontrada" });

  const boleta = {
    id: store.boletas.length + 1,
    ordenId,
    total: orden.productos.reduce((acc, p) => acc + p.precio, 0),
    fecha: new Date().toISOString(),
  };
  store.boletas.push(boleta);

  return res.status(201).json({ ok: true, boleta });
};