const Pool = require("../config/db");

const getAllRecipes = async () => {
  console.log("model getAllRecipes");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
    =category.id`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        reject(err);
      }
    })
  );
};


const getRecipeById = async (id) => {
  console.log("model getRecipeById");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
    =category.id WHERE recipes.id=${id}`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const deleteRecipeById = async (id) => {
  console.log("model getRecipeById");
  return new Promise((resolve, reject) =>
    Pool.query(`DELETE FROM recipes WHERE id=${id}`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const postRecipe = async (data) => {
  console.log("model postRecipe");
  let { title, ingredients, photo, category_id } = data;

  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO recipes (title, ingredients, photo, category_id) VALUES('${title}','${ingredients}', '${photo}',${category_id})`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const putRecipe = async (data) => {
  console.log("model putRecipe");
  let { id, title, ingredients, photo, category_id } = data;

  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE recipes SET title='${title}', ingredients='${ingredients}', photo='${photo}',category_id=${category_id} WHERE id=${id}`,
      (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const getCategory = async () => {
  console.log("model getCategory");
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM category;`, (err, result) => {
      if (!err) {
        return resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  getAllRecipes,
  postRecipe,
  putRecipe,
  getRecipeById,
  deleteRecipeById,
  getCategory
};