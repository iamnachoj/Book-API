const {Router} = require('express')
const userController = require('./user.controller')

const userRouter = Router();

userRouter.route('/register').post(userController.registerUser);

module.exports = userRouter;
