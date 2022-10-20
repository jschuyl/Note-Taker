// these are my npms, there are many like them but these are mine
const express = require("express");
const fs = require("fs");
const path = require("path");
// easy word to make express more better to use
const app = express();
// Heroku and local port access
const PORT = process.env.PORT || 3001;
// parse set up
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

let note = JSON.parse(data);

// sends notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
// posts notes
app.post("/api/notes", (req, res) => {
  let newNote = req.body;
  note.push(newNote);
  doDbThings();
});

app.get("*", (req, res) => 
res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log("Listening at http://localhost:" + PORT)
);

function doDbThings() {
  fs.writeFile("/db/db.json", JSON.stringify(note, "\t"), err => {
    if (err) throw err;
    return true;
  });
}