const UserService = require('./user.service');

const registerUser = async (req, res) => {
  try {
    const isValid = await UserService.IsUsernameOrEmailExist(req);
    if (isValid) {
      return res
        .status(400)
        .send(
          "'" +
            req.body.Name +
            "'" +
            ' username already exists, or the introduced email is already been used. Please try again.'
        );
    } else {
      const savedUser = await UserService.registerUser(req);
      res.status(201).json(savedUser);
    }
  } catch (error) {
    res.status(500).send('Error: ' + error);
  }
};


const createUser = async (req,res) =>{
  const inputData = req.body
  try {
    const createdUser = await UserService.createUser(inputData)
    res.status(201).json(createdUser)
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
}


const updateUserByUsername = async (req,res) =>{
  const inputData = req.body
  const username = req.params.username
  try {
    const updatedUser = await UserService.updateUserByUsername(inputData, username)
    res.status(201).json(updatedUser)
  } catch (error) {
    res.status(500).send("Error: " + error);
  }
}


module.exports ={
  registerUser,
  createUser,
  updateUserByUsername
}