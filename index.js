const { fetchMyIP, fetchCoordsByIP, issFlyover, nextISSTimesForMyLocation } = require('./iss');

const pubIP = '162.157.153.82';
const coordinates = { latitude: 52.2681118, longitude: -113.8112386 };

// //fetch our public IP Address
// fetchMyIP((error, pubIP) => {
//   // if (error) {
//   //   console.log("It didn't work!", error);
//   //   return;
//   // }
//   // console.log("It worked! Returned IP:", pubIP);
// });

// //fetch our geo coordinates (longitude/latitude) for our IP Address
// fetchCoordsByIP(pubIP, (error, coordinates) => {
//   // if (error) {
//   //   console.log("It didn't work!", error);
//   //   return;
//   // }

//   // console.log('It worked! Returned coordinates:', coordinates);
// });

// // fetch the next ISS flyover for our geo coordinates
// issFlyover(coordinates, (error, flyover) => {
//   // if (error) {
//   //   console.log("It didn't work!", error);
//   //   return;
//   // }

//   // console.log('It worked! Next Flyover:', flyover);
// });

//final output string = 'Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!'
nextISSTimesForMyLocation((error, results) => {
  //results must contain date objects
  if (error) {
    console.log(error);
    return; 
  }
  for (result of results) {
    console.log('Next pass at',result,'!');
  }
  
});