const express = require("express");
const SP_Characters = require("./Public/South_Park_Characters.json");
const path = require('path'); // Add this line to import the path module
//authentication
const { validateSP } = require("./Schema/Characters.js");

const PORT = process.env.PORT || 3450;

const app = express();
app.disable("x-powered-by");

app.set('view engine', 'ejs');
app.set('Views', path.join(__dirname, 'Views'));

app.use(express.static("public"));


app.use(express.json());

app.get("/App", (req, res) => {
    res.render("Users/Characters", { Characters: SP_Characters });
});
app.get("/Up", (req, res) => {
  res.render("API/Update");
});

app.get("/API/Characters/:name", (req, res) => {
  const { name, image } = req.params;
  const character = SP_Characters.find((character) => character.name === name);
  if (character) {
    res.send(JSON.stringify(character));
  } else {
    res.status(404).json({ message: "not found" });
  }
});

app.get("/API/Characters", (req, res) => {
  const { Grade } = req.query;
  if (Grade) {
    const CharactersFound = SP_Characters.filter((ch) => {
      return ch.Grade && ch.Grade.toLowerCase() === Grade.toLowerCase();
    });
    res.send(JSON.stringify(CharactersFound));
  } else {
    res.status(404).json({ message: "not found" });
  }
});

app.post("/API/Characters", (req, res) => {
  const ValidPost = validateSP(req.body);

  if (ValidPost.success) {
    res.status(201).send(ValidPost);
  } else {
    return res.status(400).json({ error: JSON.parse(ValidPost.error.message) });
  }
});


app.use(express.json());

app.listen(PORT);
