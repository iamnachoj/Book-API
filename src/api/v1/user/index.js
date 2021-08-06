const { Router } = require('express');
const { validate } = require('../../../helpers/validate');
const { authenticate,requiresLocalAuth } = require('../../../auth/authentication');

const UserController = require('./user.controller');
const { createUserValidation, updateUserValidation } =  require('./user.validation');

const userRouter = Router();

userRouter.route('/login').post(requiresLocalAuth());
userRouter.route('/register').post(validate(createUserValidation),UserController.registerUser);
userRouter.route('/').post(validate(createUserValidation), UserController.createUser);
userRouter.route('/').get( UserController.getAllUsers);
userRouter.route('/:username').get( authenticate(), UserController.getUserByUsername);

userRouter.route('/:username').post(validate(updateUserValidation), authenticate(), UserController.updateUserByUsername);
userRouter.route('/:username/movies/:movieId').put(validate(authenticate(), UserController.addMovieToUserFavorite));
userRouter.route('/:username/movies/:movieId').delete(validate(authenticate(), UserController.removeUserFromFavoriteList));

module.exports = userRouter;