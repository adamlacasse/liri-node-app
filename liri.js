require("dotenv").config();

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    name: "commands",
    message: "Choose on of these commands.",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }
]).then(function(user) {

});

