const {Router} = require('express')

const userRoutes = require('../v1/user/index');

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Movie api is live!' });
});

// GET homepage
apiRouter.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // dirname allows node to start by the current directory
});

// GET documentation
apiRouter.get("/documentation", (req, res) => {
  res.sendFile(__dirname + "/public/documentation.html");
});

apiRouter.use('/user', userRoutes);

//redirects wrong urlendpoints to homepage
apiRouter.all("*", function (req, res) {
  res.redirect("/");
});

module.exports = apiRouter;

