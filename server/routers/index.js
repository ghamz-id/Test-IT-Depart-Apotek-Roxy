const express = require("express");
const BarangController = require("../controllers/barang.controller");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.post("/master", BarangController.addBarang);
router.get("/master", BarangController.findBarang);
router.put("/master/:id", BarangController.updateBarang);
router.delete("/master/:id", BarangController.deleteBarang);

module.exports = router;
