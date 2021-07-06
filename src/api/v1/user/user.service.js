const UserModel = require('./user.model')

const registerUser = async(req) =>{
  let hashedPassword = UserModel.hashPassword(req.body.Password);
  const savedUser = await UserModel.create({
            Name: req.body.Name,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })

  return savedUser
}

const IsUsernameOrEmailExist = async (req) =>{
 const isValid = await  UserModel.findOne({ $or: [{ Name: req.body.Name }, { Email: req.body.Email }] })
 return isValid
}

module.exports ={
    registerUser,
  IsUsernameOrEmailExist
}