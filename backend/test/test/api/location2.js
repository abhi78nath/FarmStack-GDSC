// geolocation.js

const geolocation = require('node-geolocation');
const axios = require('axios');

function getUserLocation(callback) {
  geolocation.getCurrentPosition(async (err, position) => {
    if (err) {
      callback(err);
    } else {
      try {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const city = response.data.address.city || response.data.address.town || response.data.address.village || response.data.address.county || response.data.address.state || response.data.address.country;
        callback(null, { latitude, longitude, city });
      } catch (err) {
        callback(err);
      }
    }
  });
}

module.exports = {
  getUserLocation,
};
