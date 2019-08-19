const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
// const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/city', (req, res) => {
  const city = req.query.city;
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ 
      weather: `Hello ${city}!` 
    }));
});

app.post('/api/weather', (req, res) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
  });

app.listen(3001);

// const api_key = process.env.API_KEY;