const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cf80a6f4d248897ec46cfb55c1e894b3&query=' + latitude + ',' + longitude + '&units=f';
    request({ url,json: true}, (error,{body})=>{
        if(error){
            callback('Could not connect to weather service',undefined)
        } else if(body.error){
            callback('Could not find location at ' + latitude + ' and ' + longitude);
        } else{
            const data = body;
            const location = data.location.country;
            const temp = data.current.temperature;
            const feelslike = data.current.feelslike;
            const description = data.current.weather_descriptions[0];
            callback(undefined,`${temp} and ${description} in ${location}, feels like ${feelslike}`)
        }
    });
}

module.exports = forecast