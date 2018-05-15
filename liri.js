var keys = require('./keys.js');

// var Spotify = require('node-spotify-api');
// var request = require('request');
// var fs = require('fs');

var Twitter = require('twitter'); 
var client = new Twitter(keys.twitter);
  
var params = {screen_name: 'AwlUnh'};
client.get('statuses/home_timeline', params, function(error, tweets, response) {
  debugger;
  if (!error) {
    console.log(tweets);
  } else {console.log(error)}
});

