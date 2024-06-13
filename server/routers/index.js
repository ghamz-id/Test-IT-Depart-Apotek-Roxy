const express = require("express");
const MasterController = require("../controllers/master.controller");
const TransController = require("../controllers/trans.contoller");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.post("/master", MasterController.addBarang);
router.get("/master", MasterController.findBarang);
router.put("/master/:id", MasterController.updateBarang);
router.delete("/master/:id", MasterController.deleteBarang);

router.post("/transaksi", TransController.createTrans);
router.get("/transaksi", TransController.findTrans);

module.exports = router;
