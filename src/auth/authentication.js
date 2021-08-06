const passport = require('passport');
const {generateJWTToken} = require('./jwt')

const authenticate = () => (req, res, next) =>
   passport.authenticate('jwt', function(err, user, info) {
        if (err) return next(err);

        if (!user) return res.status(401).json({message: "Unauthorized Access - No Token Provided!"});

        req.user = user;

        next();

    })(req, res, next);

const requiresLocalAuth = () => (req, res, next) =>
  passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something went wrong",
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token }); //ES6 shorthand for user: user, token: token
      });
    })(req, res, next);

module.exports = {authenticate, requiresLocalAuth};