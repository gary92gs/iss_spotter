const request = require('request');

//fetch our public IP Address
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = body.split('"')[3];
    callback(null, ip);
  });
};

//fetch geo coordinates based off of IP
const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const bodyObj = JSON.parse(body);
    if (bodyObj.success === false) {
      const msg = `${bodyObj.ip} is ${bodyObj.message}.`;
      callback(Error(msg), null);
      return;
    }
    const coordinates = {
      'latitude': bodyObj.latitude,
      'longitude': bodyObj.longitude
    };
    callback(null, coordinates);
  });
};

//fetch list of next ISS flyovers based on provided geolocation
const issFlyover = (coordinates, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (body === 'invalid coordinates') {
      const msg = `The coordinates: (${coordinates.latitude}, ${coordinates.longitude}) are ${body}.`;
      callback(Error(msg), null);
      return;
    }
    const bodyObj = JSON.parse(body);
    callback(null, bodyObj.response);
  });
};

//main function to orchestrate api requests and routing requested information.
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, pubIP) => {
    // console.log('fetchMyIP - pubIP = ',pubIP)
    if (error) {
      callback(error,null);
      return;
    }
    // console.log('fetching coordinates by IP')
    fetchCoordsByIP(pubIP, (error, coordinates) => {
      // console.log('fetchCoordsbyIP - coordinates = ',coordinates)
      if (error) {
        callback(error,null);
        return;
      }
      // console.log('fetching iss flyover times')
      issFlyover(coordinates, (error, flyovers) => {
        // console.log('issFlyover',flyovers)
        // console.log(flyovers);
        if (error) {
          callback(error,null);
          return;
        }
        const dateArray = [];
        for (flyover of flyovers) {
          dateArray.push(new Date(flyover.risetime).toString() + ' for ' + flyover.duration + ' seconds');
        }
        callback(null, dateArray)
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  issFlyover,
  nextISSTimesForMyLocation
};