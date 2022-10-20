// these are my npms, there are many like them but these are mine
const { notStrictEqual } = require("assert");
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
app.use(express.static(__dirname));

fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    var note = JSON.parse(data);
    // get route for the notes
    app.get("/api/notes", (req, res) => {
        res.json(note);
    });
    // post route for the notes
    app.post("./api/notes", function(req, res) {
        let newNote = req.body;
        note.push(newNote);
        doDbThings();
    })
    // database updater
    function doDbThings() {
        fs.writeFile("./db/db.json", JSON.stringify(note, "\t"), err => {
            if (err) throw err;
            return true;
        })
    }
})


app.listen(PORT, () =>
  console.log("Listening at http://localhost:" + PORT)
);