const morgan = require("morgan"); // Require Morgan
const bodyParser = require("body-parser"); // require body-parser
const express = require("express"); // Require Express
const app = express();

let movies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "Chris Colimbus",
    year: 2001,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "Peter Jackson",
    year: 2001,
  },
  {
    title: "Pirates of Caribbean: The course of the Black Pearl",
    author: "Gore Verbinski",
    year: 2003,
  },
  {
    title: "Star Wars: A New Hope",
    author: "George Lucas",
    year: 1977,
  },
  {
    title: "Star Wars: The Empire Strikes Back",
    author: "Irvin Kershner",
    year: 1980,
  },
  {
    title: "Star Wars: Return of the Jedi",
    author: "Richard Marquand",
    year: 1983,
  },
];

// middleware
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

app.get("/movies", (req, res) => {
  res.json(movies);
});

// listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
