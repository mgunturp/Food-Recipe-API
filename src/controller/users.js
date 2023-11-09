const { selectId, insertUser,getUser } = require("../model/users");
const { v4: uuidv4 } = require('uuid');
const argon2 = require('argon2');
const {generateToken} = require("../helper/token");

const UsersController = {
	register: async (req,res,next)=> {
		let {email,password,username} = req.body
		if(!email || !password || !username){
			return res.status(400).json({status:400,message:'email password username is required'})
		}
		
		let user = await selectId(email)
		
		if(user.rowCount==1){
			return res.status(400).json({status:400,message:'email already register'})
		}

		password = await argon2.hash(password)


		let data = {
			uuid: uuidv4(),
			email,
			password,
			username
		}
		
		let result = await insertUser(data)

		console.log("result" )
		console.log(result )
		
		res.status(200).json({status:200,message:'register success'})
	},

  login: async(req,res,next)=>{
    let {email,password}=req.body
    if (!email||!password) {
      return res.status(400).json({status:400,message:'email & password is required'})
    }
    
    let {rows,rowCount} = await selectId(email)
    let user=rows[0]

		if(rowCount==0){
			return res.status(400).json({status:400,message:'email not found, please register'})
		}

    let isVerify = await argon2.verify(user.password,password)

    if (!isVerify) {
      return res.status(400).json({status:400,message:'wrong password'})
    }

    delete user.password
    let token=generateToken(user)
    user.token=token

    console.log(user);
    
    return res.status(200).json({status:200,message:'login success',data:user})
  },

  getAllUser: async (req, res, next) => {
      let users = await getUser()
        let data = users.rows
        if(!data){
            return res.status(404).json({message: 'failed to get data users'})
        }

        res.status(200).json({message : 'succes get data from users', data})
  },
  
  
}

module.exports=UsersController
