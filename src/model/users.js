const Pool = require("../config/db");



const selectId = async (email) => {
    console.log("model selectId");
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM users WHERE email='${email}';`, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };

const insertUser = async (data) => {
    console.log("model insertUser");
    let {uuid,email,password,username}=data
    return new Promise((resolve, reject) =>
      Pool.query(`INSERT INTO users(uuid,email,password,username)VALUES('${uuid}', '${email}',
      '${[password]}','${username}');`, (err, result) => {
        if (!err) {
          return resolve(result);
        } else {
          reject(err);
        }
      })
    );
  };

  const getUser = async () => {
    console.log("model getUser");
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

  module.exports = {
    selectId,
    insertUser,
    getUser
  };