const express = require("express");
const MasterController = require("../controllers/master.controller");
const router = express.Router();

router.post("/", MasterController.addBarang);
router.get("/", MasterController.findBarang);
router.get("/:id", MasterController.findBarangId);
router.put("/:id", MasterController.updateBarang);
router.delete("/:id", MasterController.deleteBarang);

module.exports = router;
