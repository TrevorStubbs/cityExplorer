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

    superagent.get(url)
      .then(superAgentOutput => {
        let responseObject = new Location(city, superAgentOutput.body[0]);
        response.status(200).send(responseObject);
      }).catch(err => console.log(err));

  } catch(err){
    errorMessage(response, err);
  }
});

// Weather Route
// TODO - update this for more than 1 location
app.get('/weather', (request, response) => {
  try{
    let search_query = request.query.search_query;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search_query}&key=${process.env.WEATHER_API_KEY}`

    superagent.get(url)
      .then(superAgentOutput => {
        const returnArray = superAgentOutput.body.data.map(value => {
          return new Weather(value);
        });
        response.status(200).send(returnArray);
      }).catch(err => console.log(err));

  } catch(err){
    errorMessage(response, err);
  }
});

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
//TODO - will probably need to pass in the city info as an arg tomorrow
function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.datetime).toDateString();
}

// Start the server
app.listen(PORT, () =>{
  console.log(`listening on ${PORT}.`);
});

