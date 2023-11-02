const express = require("express")
const recipes = require("./recipes");
const { categoryAll } = require("../controller/recipes");
const router = express.Router()


router.use('/recipe',recipes)
router.get("/category", categoryAll);

module.exports=router