const morgan = require("morgan"); // require Morgan
const bodyParser = require("body-parser"); // require body-parser
const express = require("express"); // require Express
const uuid = require("uuid"); // require uuid
const mongoose = require("mongoose");
const Models = require("./models.js");

const app = express();
const Movies = Models.Movie;
const Users = Models.User;

// middleware
app.use(bodyParser.json()); // will parse JSON
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(morgan("common"));
app.use(express.static("public")); // this allows files to fetch statically, within the public folder
// deal with error:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// GET requests
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // dirname allows node to start by the current directory
});

app.get("/documentation", (req, res) => {
  res.sendFile(__dirname + "/public/documentation.html");
});

app.get("/API/movies", (req, res) => {
  Movies.find().then((movies) => res.json(movies));
});

app.get("/API/movies/:title", (req, res) => {
  Movies.find({ Title: req.params.title }).then((movie) => res.json(movie));
});

app.get("/users/:name/:id", (req, res) => {
  let user = users.find((user) => {
    return user.name === req.params.name;
  });
  if (user.id === req.params.id) {
    res.json(user);
  } else {
    res.status(401).send("user incorrect");
  }
}); // by adding your name and password, you can access to your user

//POST request to register
app.post("/register", (req, res) => {
  let user = req.body;

  if (!user.name) {
    res.status(400).send("Missing name!");
  } else {
    user.id = uuid.v4();
    users.push(user);
    res.json(user);
  }
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
