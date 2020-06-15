const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXA5NDMwODciLCJhIjoiY2thaDdoYjZ4MGd6ODJ4cG5rOG50aTVqMSJ9.bxrFWIx_OAZ6mavK1YWONQ&limit=1k.eyJ1IjoiZXA5NDMwODciLCJhIjoiY2thaDdoYjZ4MGd6ODJ4cG5rOG50aTVqMSJ9.bxrFWIx_OAZ6mavK1YWONQ';

    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined);
        } else if(body.message){
            callback(`Unable to find ${address}, try another search`,undefined);
        } else if(body.features.length==0){
            callback('Unable to find location')
        } else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode