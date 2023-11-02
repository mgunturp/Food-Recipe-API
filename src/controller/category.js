const {
    getCategory,
  } = require("../model/category");



const CategoryController = {

  categoryAll: async (req, res, next) => { 
    let category = await getCategory()

    res.status(200).json({ message: "success get data", data: category.rows });
  },
  

}

module.exports = CategoryController;