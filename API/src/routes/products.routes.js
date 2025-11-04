const { Router } = require("express");
const ctrl = require("../controllers/products.controller");
const router = Router();

router.get("/", ctrl.list);
router.get("/search", ctrl.search);

module.exports = router;