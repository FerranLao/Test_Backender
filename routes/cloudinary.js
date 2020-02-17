const express = require("express");
const router = express.Router();
const { statistics, csv } = require("../controllers/cloudinary");

router.get("/statistics", statistics);

router.get("/csv", csv);

module.exports = router;
