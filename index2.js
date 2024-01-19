const { nextISSTimesForMyLocation } = require('./iss_promised');




const printPassTimes = (flyovers) => {
  const dateArray = [];
  for (flyover of flyovers) {
    console.log(new Date(flyover.risetime).toString() + ' for ' + flyover.duration + ' seconds');
  }
};




nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch(error => {
    console.log("It didn't work: ", error.message);
  });





















