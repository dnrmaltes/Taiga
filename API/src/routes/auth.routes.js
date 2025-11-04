const { Router } = require("express");
const ctrl = require("../controllers/auth.controller");
const router = Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/recover", ctrl.recover);
// router.post("/reset", ctrl.reset); // si lo tienes

module.exports = router;