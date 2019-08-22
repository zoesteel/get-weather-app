const { api_key } = require('./config');
const axios = require('axios');

const weatherAPI = (req, res) => {    
    const city = req.body.city;
    const units = req.body.units;

    // with more time I would figure out why the env variables aren't importing and not hard code the key!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=d5566182730361aa1c00849d2f86bb95`
 
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
    }

module.exports = {
    weatherAPI
}