const jwtSecret = "your_jwt_secret"; //connects to JWT Strategy in passport.js

const jwt = require("jsonwebtoken")

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Name, // This is the username you’re encoding in the JWT
    expiresIn: "7d", // This specifies that the token will expire in 7 days
    algorithm: "HS256", // This is the algorithm used to “sign” or encode the values of the JWT
  });
};

module.exports ={generateJWTToken}