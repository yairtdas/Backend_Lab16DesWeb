const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Públicas (cualquiera puede ver)
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Protegidas (solo ADMIN)
router.post("/", verifyToken, isAdmin, controller.create);
router.put("/:id", verifyToken, isAdmin, controller.update);
router.delete("/:id", verifyToken, isAdmin, controller.remove);

module.exports = router;