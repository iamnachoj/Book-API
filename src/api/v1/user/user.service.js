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

const getUserByUsername = async (username) => {
  const foundUser = await UserModel.findOne({ Name: username })
  return foundUser
}

const getAllUsers = async () => {
  const foundUsers = await UserModel.find()
  return foundUsers
}

const updateUserByUsername = async(inputData, username)=>{
    const {password,Email,Birthday} = inputData
   let hashedPassword = Users.hashPassword(password);
   const updatedUser = await Users.findOneAndUpdate(
      { Name: username},
      {
        $set: {
          Name: Name,
          Password: hashedPassword,
          Email: Email,
          Birthday: Birthday,
        }
      },
      { new: true })

      return updatedUser
    }


const addMovieToUserFavorite = async (username, MovieID) => {
    const movieAddedToUser = await  Users.findOneAndUpdate(
      { Name:username },
      {
        $addToSet: { FavouriteMovies: MovieID }
      },
      { new: true })
       return movieAddedToUser
    }



const removeUserFromFavoriteList = async (username, MovieID) => {
    const removedUserFromFavorite = await Users.findOneAndUpdate(
      { Name: username },
      {
        $pull: { FavouriteMovies:MovieID }
      },
      { new: true })

      return removedUserFromFavorite
}

const deleteUserByUsername = async (username) => {
  const deletedUser = await  Users.findOneAndRemove({ Name: username })
  return deletedUser
}

module.exports = {
updateUserByUsername,
addMovieToUserFavorite,
removeUserFromFavoriteList,
deleteUserByUsername,
registerUser,
IsUsernameOrEmailExist,
getAllUsers,
getUserByUsername
}