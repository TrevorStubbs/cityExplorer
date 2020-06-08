'use strict';

const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  console.log('Am I on the console?');
  response.status(200).send('Am I on the browser?');
});

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}.`);
});

