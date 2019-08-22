const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const apiConnector = require('./apiConnector');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// set up server
const port = process.env.PORT || 3001;
app.listen(port);

// call weather API
app.post('/weather', (req, res) => {
    apiConnector.weatherAPI(req, res)
});