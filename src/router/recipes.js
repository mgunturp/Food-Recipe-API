const express = require("express");
const { getRecipes, inputRecipe, getRecipeId, updateRecipe, deleteRecipeId,getRecipesDetail } = require("../controller/recipes");

const router = express.Router();

router.get("/", getRecipes);
router.get("/detail", getRecipesDetail);
router.get("/:id", getRecipeId);
router.post("/", inputRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipeId)

module.exports = router;
