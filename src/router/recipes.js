const express = require("express");
const { getRecipes, inputRecipe, getRecipeId, updateRecipe, deleteRecipeId,getRecipesDetail,getRecipesUser,getRecipesUserByIdUser } = require("../controller/recipes");
const {Protect}=require('../middleware/private');
const upload = require("../middleware/upload");
const router = express.Router();


router.get("/",Protect, getRecipes);
router.get("/my-recipe",Protect, getRecipesUser);
router.get("/user/:id",Protect, getRecipesUserByIdUser);
router.get("/detail", getRecipesDetail);
router.get("/:id", getRecipeId);
router.post("/",Protect, upload.single('photo'),inputRecipe);
router.put("/:id",Protect,upload.single('photo'), updateRecipe);
router.delete("/:id",Protect, deleteRecipeId)

module.exports = router;
