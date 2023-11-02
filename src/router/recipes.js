const express = require("express");
const { getRecipes, inputRecipe, getRecipeId, updateRecipe, deleteRecipeId } = require("../controller/recipes");

const router = express.Router();


router.get("/", getRecipes);
router.get("/:id", getRecipeId);
router.post("/", inputRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipeId)

module.exports = router;
