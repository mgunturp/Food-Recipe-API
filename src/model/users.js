const Pool = require("../config/db");



const getUsers = async () => {
    console.log("model getUsers");
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM users;`, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };
  
  // const getUserById = async (id) => {
  //   console.log("model getRecipeById");
  //   return new Promise((resolve, reject) =>
  //     Pool.query(`SELECT recipes.id, recipes.title, recipes.ingredients, recipes.photo, category.name AS category FROM recipes JOIN category ON recipes.category_id
  //     =category.id WHERE recipes.id=${id}`, (err, result) => {
  //       if (!err) {
  //         return resolve(result);
  //       } else {
  //         reject(err);
  //       }
  //     })
  //   );
  // };


  module.exports = {
    getUsers,
    // getUserById
  };