const jwtSecret = "your_jwt_secret"; //connects to JWT Strategy in passport.js

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); //links to local passport file

let generateJWTToken = user => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, //the actual user which gets the JWTToken
    expiresIn: "7d", //gives an expiration date (7days)
    algorithm: "HS256" //algorithm to encode the JWT
  });
};

module.exports = router => {
  router.post("/login", (req, res) => {
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
    })(req, res);
  });
};