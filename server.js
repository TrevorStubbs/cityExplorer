'use strict';

// Import express
const express = require('express');
const app = express();

// Import and configure the .env
require('dotenv').config();

// import cors
const cors = require('cors');
app.use(cors());

// Import pg
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

//Import superagent
const superagent = require('superagent');

// define the port if not 3001 if there is an error
const PORT = process.env.PORT || 3001;

// Testing the server with the home route
app.get('/', (request, response) => {
  console.log('Am I on the console?');
  response.status(200).send('Am I on the browser?');
});

// Test the database
app.get('/select', (request, response) => {
  let sqlQuery = 'SELECT * FROM locations;';

  client.query(sqlQuery)
    .then(sqlResults => {
      response.status(200).send(sqlResults.rows);
    })
    .catch()
});

// Location route
app.get('/location', (request, response) => {
  try{
    // get the city the user requested
    let city = request.query.city;
    // grab the url and put in the API key
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;

    // Setup the SQL query
    let sqlQuery = 'SELECT * FROM locations WHERE search_query like ($1);';
    let safeValue = [city];

    // query the database to see if the city is already there
    client.query(sqlQuery, safeValue)
      .then(sqlResults => {
        if(sqlResults.rowCount > 0){
          let outputObject = new QueryLocation(sqlResults.rows[0]);
          // if there return it to the front
          response.status(200).send(outputObject);
        } else{
          // since it's not there we will grab it from the api
          superagent.get(url)
            .then(superAgentOutput => {
              // make a variable with the object to be sent to as the response
              let responseObject = new Location(city, superAgentOutput.body[0]);
              // set up a SQL query to put the new location into the database
              let sqlQuery = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);';
              // The Safe Values
              let safeValue = [
                responseObject.search_query,
                responseObject.formatted_query,
                responseObject.latitude,
                responseObject.longitude
              ];

              // put the location into the database
              client.query(sqlQuery, safeValue)
                .then(() => {}).catch()

              // Return the object to the front end.
              response.status(200).send(responseObject);
            }).catch(err => console.log(err));
        }
      }).catch();

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
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${search_query}&key=${process.env.WEATHER_API_KEY}&days=8`;

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

app.get('/movies', (request, response) => {
  try {
    // Define what we want from the front end
    let city = request.query.search_query;
    // Define the api url
    let url = 'https://api.themoviedb.org/3/search/movie';

    // Define the query params
    const queryParams = {
      api_key: process.env.MOVIE_API_KEY,
      query: city,
      limit: 20
    }

    // Have superagent get the movies from the database
    superagent(url)
      // using the defined params
      .query(queryParams)
      .then(data => {
        // map the data into an array
        let moviesArray = data.body.results.map(value => new Movie(value));
        //output the array to the front end
        response.status(200).send(moviesArray);
      }).catch(err => console.log(err));
  } catch(err){
    errorMessage(response, err);
  }
})


// Yelp route
app.get('/yelp', (request, response) => {
  try{
    // Get the yelp api url
    let url = `https://api.yelp.com/v3/businesses/search`;

    // Setup pagination
    const page = request.query.page;
    const numPerPage = 5;
    const start = (page - 1) * numPerPage;

    // set the parameters needed for the search
    const queryParams = {
      latitude: request.query.latitude,
      longitude: request.query.longitude,
      limit: numPerPage,
      offset: start
    }

    // have superagent query the api
    superagent.get(url)
      // Header for api key
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      // put the params into the query
      .query(queryParams)
      .then( data => {
        // Fill an array full of the restaurants
        let restaurantsArray = data.body.businesses.map(value =>{
          return new Restaurant(value);
        })

        // Return the array to the front end
        response.status(200).send(restaurantsArray);
      })
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

//Query Constructor
function QueryLocation(obj){
  this.search_query = obj.search_query;
  this.formatted_query = obj.formatted_query;
  this.latitude = obj.latitude;
  this.longitude = obj.longitude;
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

// movie constructor
function Movie(obj){
  this.title = obj.original_title;
  this.overview = obj.overview;
  this.average_votes = obj.vote_average;
  this.total_votes = obj.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500/${obj.poster_path}`;
  this.popularity = obj.popularity;
  this.released_on = obj.release_date;
}

// restaurant constructor
function Restaurant(obj){
  this.name = obj.name
  this.image_url = obj.image_url
  this.price = obj.price
  this.rating = obj.rating
  this.url = obj.url
}

// Start the server
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })

