'use strict';

const express = require('express');
const app = express();

require('dontenv').config();

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  console.log('Am I on the console?');
  response.send('Am I on the broswer?');
});

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}.`);
})
