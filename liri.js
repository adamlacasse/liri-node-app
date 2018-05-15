require("dotenv").config();

var keys = require('./keys.js');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    name: "commands",
    message: "Choose one of these commands, and add the search term after (e.g. a movie or song title)",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(wha) {
    console.log("inquirer loaded");
});

