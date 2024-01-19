const request = require('request-promise-native');


const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');//returning data inside promise
};

const fetchCoordsByIP = (ip) => {
  const parsedIP = ip.split('"')[3];
  return request(`https://ipwho.is/${parsedIP}`); //returning data inside promise
};

const issFlyover = (body, callback) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(issFlyover)
  .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
};



module.exports = {
  nextISSTimesForMyLocation
};