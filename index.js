const morgan = require("morgan"); // require Morgan
const bodyParser = require("body-parser"); // require body-parser
const express = require("express"); // require Express
const uuid = require("uuid"); // require uuid
const mongoose = require("mongoose"); // require mongoose
const Models = require("./models.js"); // require defined file for models

const app = express();
const Movies = Models.Movie; // here we create a variable that stores the models for both movies and users
const Users = Models.User;

// middleware
app.use(bodyParser.json()); // will parse JSON
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // this makes mongoose function
app.use(morgan("common")); // just to log info on console about http requests
app.use(express.static("public")); // this allows files to fetch statically, within the public folder
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}); // deal with error

// GET requests
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // dirname allows node to start by the current directory
}); //home page, static file

app.get("/documentation", (req, res) => {
  res.sendFile(__dirname + "/public/documentation.html");
}); // documentation. static file

app.get("/API/movies", (req, res) => {
  Movies.find().then((movies) => res.json(movies));
}); // with the help of mongoose, requests all the movies from our myFlixDB

app.get("/API/movies/:title", (req, res) => {
  Movies.find({ Title: req.params.title }).then((movie) => res.json(movie));
}); // with the help of mongoose, requests the movies that have same title as written in the endpoint, from our myFlixDB

app.get("/users/:name/:id", (req, res) => {
  let user = users.find((user) => {
    return user.name === req.params.name;
  });
  if (user.id === req.params.id) {
    res.json(user);
  } else {
    res.status(401).send("user incorrect");
  }
});

// Post requests
app.post("/register", (req, res) => {
  Users.findOne({ $or: [{ Name: req.body.Name }, { Email: req.body.Email }] })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send(
            "'" +
              req.body.Name +
              "'" +
              " username already exists, or the introduced email is already been used. Please try again."
          );
      } else {
        Users.create({
          Name: req.body.Name,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//PUT request to change name
app.put("/users/:name/:id/:newName", (req, res) => {
  let user = users.find((user) => {
    return user.name === req.params.name;
  });

  if (user.id === req.params.id) {
    user.name = req.params.newName;
    res.status(201).json(user);
  } else {
    res
      .status(404)
      .send("User with the name " + req.params.name + " was not found.");
  }
});

// listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
