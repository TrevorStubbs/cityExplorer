'use strict';

const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  console.log('Am I on the console?');
  response.status(200).send('Am I on the browser?');
});

app.get('/location', (request, response) => {
  // console.log(request.query.city);
  let search_query = request.query.city;

  let geoData = require('./data/location.json');
  // console.log(geoData);
  let returnObj = new Location(search_query, geoData[0]);
  // console.log(returnObj);

  response.status(200).send(returnObj);
});

app.get('/weather', (request, response) => {
  // console.log(request);
  console.log('AM I ALIVE');
  let weatherData = require('./data/weather.json');

  console.log(weatherData.data[0].weather.description);
  let returnArray = [];
  returnArray.push(new Weather(weatherData.data[0]));
   
  console.log(returnArray)

  response.status(200).send(returnArray);
})

function Location(searchQuery, obj){
  this.search_query = searchQuery;
  this.formatted_query = obj.display_name;
  this.latitude = obj.lat;
  this.longitude = obj.lon;
}

function Weather(obj){
  this.forecast = obj.weather.description;
  this.time = new Date(obj.valid_date).toDateString();
}

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}.`);
});

