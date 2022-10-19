// these are my npms, there are many like them but these are mine
const express = require("express");
const fs = require("fs");
const path = require("path");
const util = require("util");
const readTheFile = util.promisify(fs.readTheFile);
const uuid = require("uuid");
// easy word to make express more better to use
const app = express();
// Heroku and local port access
const PORT = process.env.PORT || 3001;

// parse set up
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
