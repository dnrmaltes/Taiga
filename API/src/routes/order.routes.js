const { Router } = require("express");
const ctrl = require("../controllers/order.controller");
const router = Router();

router.post("/checkout", ctrl.checkout);
router.get("/estado/:id", ctrl.estado);

module.exports = router;