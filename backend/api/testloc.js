// Importing required modules
const axios = require('axios');
const { geolocationKey } = require('./config');
const { predictCrop } = require('./cropPredictor');

// Function to get user's location
async function getLocation() {
  try {
    // Getting user's coordinates
    const { coords } = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    // Getting user's address from coordinates
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${geolocationKey}`);

    // Extracting city, state, and country from the address
    const { address_components } = response.data.results[0];
    const city = address_components.find(component => component.types.includes('locality')).long_name;
    const state = address_components.find(component => component.types.includes('administrative_area_level_1')).long_name;
    const country = address_components.find(component => component.types.includes('country')).long_name;

    // Returning user's location as an object
    return {
      city,
      state,
      country,
      latitude: coords.latitude,
      longitude: coords.longitude
    };
  } catch (error) {
    console.error(error);
  }
}

// Function to predict crops based on location, soil, and climate
async function predictCrops() {
  try {
    // Getting user's location
    const location = await getLocation();

    // Getting soil and climate data for user's location
    const soilData = await getSoilData(location.latitude, location.longitude);
    const climateData = await getClimateData(location.latitude, location.longitude);

    // Predicting crops based on soil and climate data
    const crops = await predictCrop(soilData, climateData);

    // Printing predicted crops
    console.log(`Based on your location in ${location.city}, ${location.state}, ${location.country}, we recommend growing the following crops:`);
    crops.forEach(crop => console.log(`- ${crop}`));
  } catch (error) {
    console.error(error);
  }
}

// Calling predictCrops function to start predicting crops
predictCrops();
