const morgan = require("morgan"); // require Morgan
const bodyParser = require("body-parser"); // require body-parser
const express = require("express"); // require Express
const uuid = require("uuid"); // require uuid
const app = express();

let movies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "Chris Colimbus",
    year: 2001,
    description:
      "Harry Potter is an orphaned boy brought up by his unkind Muggle (non-magical) aunt and uncle. At the age of eleven, half-giant Rubeus Hagrid informs him that he is actually a wizard and that his parents were murdered by an evil wizard named Lord Voldemort",
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    author: "Peter Jackson",
    year: 2001,
    description:
      "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.",
  },
  {
    title: "Pirates of Caribbean: The curse of the Black Pearl",
    author: "Gore Verbinski",
    year: 2003,
    description:
      "A blacksmith joins forces with Captain Jack Sparrow, a pirate, in a bid to free the love of his life from Jack's associates, who kidnapped her suspecting she has the medallion.",
  },
  {
    title: "Star Wars: A New Hope",
    author: "George Lucas",
    year: 1977,
    description:
      "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.",
  },
  {
    title: "Star Wars: The Empire Strikes Back",
    author: "Irvin Kershner",
    year: 1980,
    description:
      "Darth Vader is adamant about turning Luke Skywalker to the dark side. Master Yoda trains Luke to become a Jedi Knight while his friends try to fend off the Imperial fleet.",
  },
  {
    title: "Star Wars: Return of the Jedi",
    author: "Richard Marquand",
    year: 1983,
    description:
      "Luke Skywalker attempts to bring his father back to the light side of the Force. At the same time, the rebels hatch a plan to destroy the second Death Star.",
  },
];

// middleware
app.use(morgan("common"));
app.use(express.static("public")); // this allows files to fetch statically, within the public folder
app.use(bodyParser.json()); // will parse JSON

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
  res.json(movies);
});

app.get("/API/movies/:title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

// listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
