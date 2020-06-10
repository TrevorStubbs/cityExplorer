'use strict';

// Import express
const express = require('express');
const app = express();

// Import and configure the .env
require('dotenv').config();

// import cors
const cors = require('cors');
app.use(cors());

//Import superagent
const superagent = require('superagent');

// define the port if not 3001 if there is an error
const PORT = process.env.PORT || 3001;

// Testing the home route
app.get('/', (request, response) => {
  console.log('Am I on the console?');
  response.status(200).send('Am I on the browser?');
});

// Location route
app.get('/location', (request, response) => {
  try{
    // get the city the user requested
    let city = request.query.city;

    // grab the url and put in the API key
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;

    // Have superagent get the info from the URL, put it into the constructor and send it to the front end
    superagent.get(url)
      .then(superAgentOutput => {
        // make a variable with the object to be sent to as the response
        let responseObject = new Location(city, superAgentOutput.body[0]);
        // the response to the get call
        response.status(200).send(responseObject);
      }).catch(err => console.log(err));

  } catch(err){
    errorMessage(response, err);
  }
});

// Weather Route
app.get('/weather', (request, response) => {
  try{
    // The city that we got back from the front end
    let search_query = request.query.search_query;

    // grab the url and put in the API key
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search_query}&key=${process.env.WEATHER_API_KEY}`

    // Have superagent get the info from the URL, put it into the constructor and send it to the front end
    superagent.get(url)
      .then(superAgentOutput => {
        // fill an array with objects passed from the api through the constructor
        const returnArray = superAgentOutput.body.data.map(value => {
          return new Weather(value);
        });
        // send the array as the output of the get call
        response.status(200).send(returnArray);
      }).catch(err => console.log(err));

  } catch(err){
    errorMessage(response, err);
  }
});

// Trails route
app.get('/trails', (request, response) => {
  try {
    // define the lat and long
    let lat = request.query.latitude;
    let lon = request.query.longitude;

    // grab the url and put in the API key with the associated lat and long
    let url = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${process.env.TRAIL_API_KEY}`

    // Have superagent get the info from the URL, put it into the constructor and send it to the front end
    superagent.get(url)
      .then(superAgentOutput => {

        // Fill an array with objects made by the constructor.
        const trailsArray = superAgentOutput.body.trails.map(value => {
          return new Trail(value);
        });

        // the output
        response.status(200).send(trailsArray);
      })
  } catch(err){
    errorMessage(response, err);
  }
})

// Catch all for a route that isn't defined
app.get('*', (request, response) => {
  response.status(404).send('sorry, this route does not exist');
})

// Error message
const errorMessage = (response, err) => {
  console.log('ERROR', err);
  response.status(500).send('Something went wrong.');
}

// Location Constructor function (searchQuery is the city we are looking for)
function Location(searchQuery, obj){
  this.search_query = searchQuery;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

// Weather constructor function
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.datetime).toDateString();
}

// Trail constructor function
function Trail(obj){
  this.name = obj.name;
  this.location = obj.location;
  this.length = obj.length;
  this.stars = obj.stars;
  this.star_votes = obj.starVotes;
  this.summary = obj.summary;
  this.trail_url = obj.url
  this.conditions = obj.conditionStatus
  this.condition_date = new Date(obj.conditionDate).toDateString();
  this.condition_time = obj.conditionDate.slice(11);
}

// Start the server
app.listen(PORT, () =>{
  console.log(`listening on ${PORT}.`);
});

