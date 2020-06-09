'use strict';

// Import express
const express = require('express');
const app = express();

// configure the .env
require('dotenv').config();

// import cors
const cors = require('cors');
app.use(cors());

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
    let search_query = request.query.city;

    // get the location json data
    let geoData = require('./data/location.json');

    // Pass the requested city throught the constructor
    let returnObj = new Location(search_query, geoData[0]);

    //return the data to the front end
    response.status(200).send(returnObj);
  } catch(err){
    errorMessage(response, err);
  }
});

// Weather Route
// TODO - update this for more than 1 location
app.get('/weather', (request, response) => {
  try{
    // get the weather json data
    let weatherData = require('./data/weather.json');

    // Empty array to store the weather info
    let returnArray = [];
    // push the weather info (as an object) into the the array
    returnArray.push(new Weather(weatherData.data[0]));

    // Return the array to the front
    response.status(200).send(returnArray);
  } catch(err){
    errorMessage(response, err);
  }
});

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
  this.time = new Date(obj.valid_date).toDateString();
}

// Start the server
app.listen(PORT, () =>{
  console.log(`listening on ${PORT}.`);
});

