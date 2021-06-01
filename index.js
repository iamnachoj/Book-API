const morgan = require("morgan"); // Require Morgan
const bodyParser = require("body-parser"); // require body-parser
const express = require("express"); // Require Express
const app = express();

let topBooks = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
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

app.get("/books", (req, res) => {
  res.json(topBooks);
});

// listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
