const express = require("express");
const TransController = require("../controllers/trans.contoller");
const router = express.Router();

router.post("/", TransController.createTrans);

module.exports = router;
