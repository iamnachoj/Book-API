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

module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};

const createUser = async (inputData) =>{
  const {username, password, email,birthday } = inputData
 let hashedPassword = Users.hashPassword(password);
 const payload = {
            username: username,
            password: hashedPassword,
            email: email,
            birthday: birthday
          }
const user  = await Users.create(payload)
      return user
}

const updateUserByUsername = async(inputData, username)=>{
    const {username, password, email,birthday } = inputData
   let hashedPassword = Users.hashPassword(password);
   const updatedUser = await Users.findOneAndUpdate(
      { username},
      {
        $set: {
           username: username,
            password: hashedPassword,
            email: email,
            birthday: birthday
        }
      },
      { new: true })

      return updatedUser
    }


const addMovieToUserFavorite = async (username, MovieID) => {
    const movieAddedToUser = await  Users.findOneAndUpdate(
      { username:username },
      {
        $addToSet: { favouriteMovies: MovieID }
      },
      { new: true })
       return movieAddedToUser
    }



const removeUserFromFavoriteList = async (username, MovieID) => {
    const removedUserFromFavorite = await Users.findOneAndUpdate(
      { username: username },
      {
        $pull: { favouriteMovies:MovieID }
      },
      { new: true })

      return removedUserFromFavorite
}

const deleteUserByUsername = async (username) => {
  const deletedUser = await  Users.findOneAndRemove({ username: username })
  return deleteUser
}

module.exports = {
createUser,
updateUserByUsername,
addMovieToUserFavorite,
removeUserFromFavoriteList,
deleteUserByUsername,
registerUser,
IsUsernameOrEmailExist
}