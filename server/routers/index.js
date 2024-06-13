const express = require("express");
const router = express.Router();
const routerMaster = require("./route.master");
const routerTransaksi = require("./route.transaksi");

router.get("/", (req, res) => {
	res.send("API is running...");
});

router.use("/master", routerMaster);
router.use("/transaksi", routerTransaksi);

router.get("/*", (req, res) => {
	res.send("Route not found.");
});

module.exports = router;
