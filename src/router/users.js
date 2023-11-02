const express = require("express");
const { usersAll } = require("../controller/users");


const router = express.Router();

router.get("/", usersAll);

module.exports = router;
