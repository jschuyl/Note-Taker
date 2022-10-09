const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

// parse set up
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname));
