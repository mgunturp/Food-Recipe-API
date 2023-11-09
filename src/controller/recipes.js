const {
  getAllRecipes,
  postRecipe,
  getRecipeById,
  putRecipe,
  deleteRecipeById,
  getCategory,
  getRecipes,
  getRecipesCount,
  getAllRecipesByUserId
  
} = require("../model/recipes");

const RecipesController = {
  getRecipes: async (req, res, next) => {
    let recipes = await getAllRecipes();
    let data = recipes.rows;

    if (!data) {
      return res.status(404).json({ message: "failed to get data" });
    }

    data.forEach((item,index)=>{
      let ingredients = item.ingredients.split(",")
      data[index].ingredients=ingredients
 
    })

    res.status(200).json({ message: "success get data", data });
  },
  getRecipesUser: async (req, res, next) => {
    let {uuid}=req.payload
    let recipes = await getAllRecipesByUserId(uuid);
    let data = recipes.rows;

    if (!data) {
      return res.status(404).json({ message: "failed to get data" });
    }

    data.forEach((item,index)=>{
      let ingredients = item.ingredients.split(",")
      data[index].ingredients=ingredients
 
    })

    res.status(200).json({ message: `success get recipe user : ${req.payload.username}`, data });
  },

  getRecipesUserByIdUser: async (req, res, next) => {
    let {id}=req.params
    let recipes = await getAllRecipesByUserId(id);
    let data = recipes.rows;

    if (!data) {
      return res.status(404).json({ message: "failed to get data" });
    }

    data.forEach((item,index)=>{
      let ingredients = item.ingredients.split(",")
      data[index].ingredients=ingredients
 
    })

    res.status(200).json({ message: `success get recipe user : ${req.payload.username}`, data });
  },

  getRecipesDetail: async (req, res, next) => {

    let {search,searchBy, limit,sortBy} = req.query

    searchBy = searchBy || 'title'
    let limiter = limit || 5
    let page = req.query.page || 1

    let asc = sortBy || 'ASC'


    console.log(searchBy);


    let data = {
      searchBy,
      search:search || '',
      offset: (page - 1 ) * limiter,
      limit: limit || 3,
      asc
    }

    
    let recipes = await getRecipes(data);
    let result = recipes.rows;
    let {rows} = await getRecipesCount(data);
    let count = parseInt(rows[0].count)

    let pagination = {
      pageNow: parseInt(page),
      totalPage: Math.ceil(count/limiter),
      totalData: count,
    }

    if (!result) {
      return res.status(404).json({ message: "failed to get result" });
    }
    
    result.forEach((item,index)=>{
      let ingredients = item.ingredients.split(",")
      result[index].ingredients=ingredients
      console.log(item.ingredients);
    })
    
    res.status(200).json({ message: "success get data", data:result,dataLength:result.length,pagination});
  },

  getRecipeId: async (req, res, next) => {
    let id = req.params.id;
    console.log("param id = ", id);
    let recipes = await getRecipeById(id);
    let data = recipes.rows[0];
    data.ingredients=data.ingredients.split(",")

    if (!data) {
      return res.status(404).json({ message: "failed to get data" });
    }

    res.status(200).json({ message: "success get data", data });
  },

  deleteRecipeId: async (req, res, next) => {
    let { uuid } = req.payload;
    let id = req.params.id;
    console.log("param id = ", id);
    let recipe_data = await getRecipeById(id);
    console.log("recipe_data");
    console.log(uuid);
    console.log(recipe_data);
    if (recipe_data.rows[0].users_id !== uuid) {
        return res
            .status(404)
            .json({ messsage: "failed, data cannot update by this user" });
    }

    let recipes = await deleteRecipeById(id);
    console.log("recipes ", recipes);
    if (recipes.rowCount == 0) {
        return res.status(404).json({ messsage: "failed delete data" });
    }
    res.status(200).json({ messsage: "success delete data" });
  },

  inputRecipe: async (req, res, next) => {
    let { title, ingredients, photo, category_id } = req.body;
    let {uuid}=req.payload

    console.log( title, ingredients, photo, category_id);

    if (!title || !ingredients || !photo || !category_id) {
      return res
        .status(404)
        .json({ message: "failed input data, title, ingredients, photo, category_id is required" });
    }

    let category = await getCategory()
    let is_category = false 
    category.rows.forEach(item => {
        if (item.id == category_id) {
          is_category=true
        }
    });

    if (!is_category) {
      return res.status(404).json({ message: "category invalid" });
    }


    let data = { title, ingredients,photo,category_id: parseInt(category_id),uuid };
    let result = await postRecipe(data);

    if (!result) {
      return res.status(404).json({ message: "failed input data" });
    }
    res.status(200).json({ message: "success input data" });
  },
  updateRecipe: async (req, res, next) => {
    let id = req.params.id;
    let {uuid}=req.payload
    let {title, ingredients,photo,category_id } = req.body;
    console.log( title, ingredients,photo,category_id);

    let recipe_Data = await getRecipeById(id);

    console.log('recipe_Data');
    console.log(recipe_Data);

    if (recipe_Data.rows[0].users_id !== uuid) {
      return res.status(404).json({ message: "failed, data cannot update by this user" });
      
    }

    if (recipe_Data.rowCount == 0) {
      return res.status(404).json({ message: "failed data not found" });
    }

    // check category
    let category = await getCategory()
    let is_category = false 
    category.rows.forEach(item => {
        if (item.id == category_id) {
          is_category=true
        }
    });

    if (!is_category) {
      return res.status(404).json({ message: "category invalid" });
    }

    let data = recipe_Data.rows[0];
    let newData ={
      id:data.id,
      title:title || data.title,
      ingredients:ingredients || data.ingredients,
      photo:photo || data.photo,
      category_id: parseInt(category_id) || data.category_id,
    }

    console.log(data);

    let result = await putRecipe(newData);
    console.log(result);

    if (!result) {
      return res.status(404).json({ message: "failed update data" });
    }
    res.status(200).json({ message: "success update data" });
  },
};

module.exports = RecipesController;