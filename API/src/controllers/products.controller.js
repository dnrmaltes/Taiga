// src/controllers/products.controller.js
const path = require("path");
const store = require("../db/store"); // <-- una sola vez

// GET /api/catalogo
exports.list = (req, res) => {
  res.json({ ok: true, items: store.productos });
};

// GET /api/catalogo/search?q=texto&categoria=Platos&page=1&perPage=9
exports.search = (req, res) => {
  const { q = "", categoria = "", page = 1, perPage = 9 } = req.query;

  // trabajar SIEMPRE con store.productos
  let data = Array.isArray(store.productos) ? [...store.productos] : [];

  if (categoria) {
    data = data.filter(
      (p) => (p.categoria || "").toLowerCase() === categoria.toLowerCase()
    );
  }
  if (q) {
    data = data.filter((p) =>
      (p.nombre || "").toLowerCase().includes(q.toLowerCase())
    );
  }

  const total = data.length;
  const pg = Math.max(parseInt(page, 10) || 1, 1);
  const per = Math.max(parseInt(perPage, 10) || 9, 1);
  const ini = (pg - 1) * per;
  const fin = ini + per;

  res.json({
    ok: true,
    total,
    page: pg,
    perPage: per,
    items: data.slice(ini, fin),
  });
};