const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(pino);
const port = process.env.PORT || 3001;

app.get('/weather', (req, res) => { 
    res.send({ express: `'Hello From Express'` });
//     const city = req.query.city;
//     const api_key = process.env.API_KEY;

    // this was working aug 21 morning
    // axios(url)
    //     .then(res => res.json())
    //     .then(result => {
    //         console.log(result);
    //         res.send({ express: result });
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     }); 
    // });
});

app.post('/weather', (req, res) => {
  console.log(req.body);
  const city = req.body.city;
  const units = req.body.units;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=d5566182730361aa1c00849d2f86bb95`
//   const api_key = process.env.API_KEY;
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
    
  axios.get(url)
    .then(response => {  
        const cityName = response.data.name; 
        const temperature = response.data.main.temp;
        const description = response.data.weather[0].main;
        
        res.send({
            city: cityName,
            temperature: temperature,
            description: description
        });

    })   
    // .catch(err => {
    //     res.send(err);
    // }); 
    .catch((error) => { 
        if (error.response) {
            // server responded with status other than 2xx
            res.send({
                error: error.response.data.message
            });            
        } else if (error.request) {
            // if no response was received    
            res.send({
                error: error.request
            });
        } else {
            // other error
            res.send({
                error: error.message
            });
        }
    })
});

app.listen(port);