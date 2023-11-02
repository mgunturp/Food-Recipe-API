const {
    getUsers,
  } = require("../model/users");



const UsersController = {

  usersAll: async (req, res, next) => { 
    let category = await getUsers()

    res.status(200).json({ message: "success get data", data: category.rows });
  },
  

}

module.exports = UsersController;