const express = require("express");
const { categoryAll } = require("../controller/category");


const router = express.Router();

router.get("/", categoryAll);

module.exports = router;
