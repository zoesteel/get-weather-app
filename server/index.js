const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios');
const testAPIRouter = require('./routes/testAPI');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// app.use("/testAPI", testAPIRouter);

app.get('/', (req, res) => {
    const city = req.query.city;
    const api_key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=london&APPID=d5566182730361aa1c00849d2f86bb95`;
    res.setHeader('Content-Type', 'application/json');
    axios(url)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            res.send({ result });
        })
        .catch(err => {
            res.send(err);
        }); 
    });

// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `${req.body}`,
//     );
//     });

app.listen(3001);