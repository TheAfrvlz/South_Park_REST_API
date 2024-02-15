const express = require("express");
const SP_Characters = require("./Public/South_Park_Characters.json");
const path = require('path');
const { validateSP } = require("./Schema/Characters.js");

const PORT = process.env.PORT || 3453;

const app = express();
app.disable("x-powered-by");

// Correct 'Views' to 'views' to match Express' default behavior
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views')); // Use lowercase 'views' as it's case-sensitive in some environments

// Serve static files correctly by providing the path to the public directory
app.use(express.static(path.join(__dirname, "Public")));

app.use(express.json());


app.get("/", (req, res) => {
  // Ensure the path to the template is correct relative to the 'views' directory
  res.send("Hello World!");
});

app.get("/App", (req, res) => {
    // Ensure the path to the template is correct relative to the 'views' directory
    res.send("Hello World!");
  });

app.get("/Up", (req, res) => {
    // Ensure the path to the template is correct relative to the 'views' directory
    res.render("API/Update");
});


app.get("/API/Characters", (req, res) => {
  res.render("Users/Characters", { Characters: SP_Characters });
});

app.get("/API/Character/:name", (req, res) => {
  const { name } = req.params;
  const character = SP_Characters.find(character => character.name === name);
  if (character) {
    res.render("Users/Character", { character });
  } else {
    res.status(404).send("Character not found");}
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
