require('dotenv').config();
var keys = require('./keys.js');
var request = require('request');


function getTweets(){
  var Twitter = require('twitter'); 
  var client = new Twitter(keys.twitter);
    
  var params = {screen_name: 'AwlUnh'};
  client.get('statuses/home_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log("Here are the tweets:");
      for(i =0; i < tweets.length; i++){
        console.log(`Tweeted: "${tweets[i].text}" on ${tweets[i].created_at}`);
      }
    } else {console.log(`Error is: ${error}`)}
  });
} // end of getTweets

var getArtistNames = function(artist) {
  return artist.name;
}

function getSpotify(songName){
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  
  spotify.search({ 
    type: 'track', query: songName }, function(error, data) {
    if (error) {
        console.log(`Error is: ${error}`);
        return;
    }
    else {
      var songs = data.tracks.items; 
      for (let i = 0; i < songs.length; i++) {
          console.log (i);
          console.log(`Artist(s): ${songs[i].artists.map(getArtistNames)}`);
          console.log(`Song Name: ${songs[i].name}`);
          console.log(`Preview URL: ${songs[i].preview_url}`);
          console.log(`Album: ${songs[i].album.name}`);
          console.log('-------------------------------------------');
      }
    }
  });
} // end of getSpotify

function getMovie(movieName) {
  request('http://wwww.omdapi.com/?t=', function (error, response, body) {
      if (!error && response.statuscode == 200) {
          var jsonData = JSON.parse(body);
          console.log('Title: ' + jsonData.Title);
          console.log('Year: ' + jsonData.Year);
          console.log('Rated: '+ jsonData.Rated); 
          console.log('IMDB Rating: ' + jsonData.imbdRating);
          console.log('Country: ' + jsonData.Country);
          console.log('Language' + jsonData.Language); 
          console.log('Plot: ' + jsonData.Plot);
          console.log('Actors: ' + jsonData.Actors);
          console.log('Rotten tomoatoes rating: ' + jsonData.tomatoRating);
          console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
      } else {console.log("WTF dude?")}
  });
} // end of getMoive

var userPicks = function (value1, value2) {
  switch (value1) {
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song': 
      if(!value2){value2 = "The Sign"};
      getSpotify(value2);  
      break;
    case 'movie-this' :
      getMovie(value2);
      break; 
    case 'do-what-it-says':
      doWhatItSays(); 
      break;
    default:
      console.log('liri does not know that');  
  }
} // end of userPicks

userPicks(process.argv[2], process.argv[3]);

