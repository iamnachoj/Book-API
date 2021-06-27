const passport = require("passport");
const localStrategy = require("passport-local").strategy;
const passportJWT = require("passport-jwt");
const Models = require("./models.js");

let Users = Models.User;
let JWTstrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      nameField: "Name",
      passwordField: "Password",
    },
    (name, password, callback) => {
      console.log(name + " " + password);
      Users.findOne({ Name: name }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        if (!user) {
          console.log("incorrect username");
          return callback(null, false, {
            message: "incorrect username or password",
          });
        }

        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
