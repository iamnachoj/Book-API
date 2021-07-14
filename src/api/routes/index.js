const {Router} = require('express')

const userRoutes = require('../v1/user/index');

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Movie api is live!' });
});

apiRouter.use('/user', userRoutes);

export default apiRouter;

