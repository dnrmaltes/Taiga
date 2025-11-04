// src/controllers/reportes.controller.js
const store = require("../db/store");

// GET /api/reportes/ventas
exports.ventas = (req, res) => {
  const totalBoletas = store.boletas.length;
  const totalVentas = store.boletas.reduce((acc, b) => acc + b.total, 0);
  return res.json({
    ok: true,
    totalBoletas,
    totalVentas,
    detalle: store.boletas,
  });
};