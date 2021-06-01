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

// GET requests
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/documentation", (req, res) => {
  res.sendFile(__dirname + "/documentation.html");
});

app.get("/books", (req, res) => {
  res.json(topBooks);
});

// listen for requests
app.listen(8080, () => {
  console.log("App is listening on port 8080.");
});
