const { Router } = require("express");
const ctrl = require("../controllers/boleta.controller");
const router = Router();

router.post("/", ctrl.generar);

module.exports = router;