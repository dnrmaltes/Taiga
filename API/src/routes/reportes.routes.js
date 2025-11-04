const { Router } = require("express");
const ctrl = require("../controllers/reportes.controller");
const router = Router();

router.get("/ventas", ctrl.ventas);

module.exports = router;