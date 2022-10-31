// these are my npms, there are many like them but these are mine
const express = require("express");
const fs = require("fs");
const path = require("path");
// creates random id
const uuid = require("uuid");
// easy word to make express more better to use
const app = express();
// Heroku and local port access
const PORT = process.env.PORT || 3001;
// parse set up
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

const writeToDb = (destination, content) =>{
  fs.writeFile(destination, JSON.stringify(content, null, "\t"), err => {
    if (err) throw err;
    return true;
  })
}
const addWhatYouRead = (content, file) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) {
      console.error(err)
    } else {
      const note = JSON.parse(data);
      note.push(content);
      writeToDb();
    }
  }
}
// sends notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
// posts notes
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (req.boy) {
    const newNote = {
      title,
      text,
      id: uuid.v4()
    }
    addWhatYouRead(newNote, "./db/db.json")
    res.json(newNote);
  } else {
    res.error("Note won't write")
  }
});

app.get("/", (req, res) => 
res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log("Listening at http://localhost:" + PORT)
);

/*function doDbThings() {
  fs.writeFile("/db/db.json", JSON.stringify(note, "\t"), err => {
    if (err) throw err;
    return true;
  });
}*/