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

// GET homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // dirname allows node to start by the current directory
});

// GET documentation
app.get("/documentation", (req, res) => {
  res.sendFile(__dirname + "/public/documentation.html");
});

// GET all movies
app.get("/API/movies", (req, res) => {
  Movies.find().then((movies) => res.json(movies));
});

// GET movies by title
app.get("/API/movies/:title", (req, res) => {
  Movies.find({ Title: req.params.title }).then((movie) => res.json(movie));
});

// Get all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// GET a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Name: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// POST register
app.post("/register", (req, res) => {
  /* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
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

// POST a movie to a user's list of favorites
app.post("/users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Name: req.params.Username },
    {
      $push: { FavouriteMovies: req.params.MovieID },
    },
    { new: true } // This line makes sure that the updated document is returned
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// PUT to update a user's info, by username
app.put("/users/:Name", (req, res) => {
  /* We’ll expect JSON in this format
  {
    Username: String,
    (required)
    Password: String,
    (required)
    Email: String,
    (required)
    Birthday: Date
  }*/
  Users.findOneAndUpdate(
    { Name: req.params.Name },
    {
      $set: {
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true } // This line makes sure that the updated document is returned
  )
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
