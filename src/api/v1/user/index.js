const { Router } = require('express');
const { validate } = require('../../../helpers/validation');
const { authenticate } = require('../../../helpers/authenticate');

const UserController = require('./user.controller');
const { createUserValidation, updateUserValidation } =  require('./user.validation');

const userRouter = Router();

userRouter.route('/register').post(userController.registerUser);
userRouter.route('/').post(validate(createUserValidation), UserController.createUser);
userRouter.route('/:username').post(validate(updateUserValidation), authenticate(), UserController.updateUserByUsername);

module.exports = userRouter;
