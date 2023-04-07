// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const DecisionTree = require('decision-tree');
const getLocation = require('./getCurrentLocation');
const getCrops = require('./getCrops');

// Initialize the Express app and router
const app = express();
const router = express.Router();

// Use middleware to parse JSON data in request body
app.use(bodyParser.json());

// Define training data for decision tree algorithm
const training_data = [
  { "location": "Mumbai", "climate": "Tropical", "soil": "Sandy", "crop": "Tomatoes" },
  { "location": "Delhi", "climate": "Semi-Arid", "soil": "Clay", "crop": "Corn" },
  { "location": "Bengaluru", "climate": "Tropical", "soil": "Red", "crop": "Rice" },
  { "location": "Hyderabad", "climate": "Tropical", "soil": "Black", "crop": "Cotton" },
  { "location": "Ahmedabad", "climate": "Arid", "soil": "Silty", "crop": "Groundnuts" },
  { "location": "Chennai", "climate": "Tropical", "soil": "Sandy", "crop": "Sugarcane" },
  { "location": "Kolkata", "climate": "Subtropical", "soil": "Alluvial", "crop": "Wheat" },
  { "location": "Pune", "climate": "Tropical", "soil": "Red", "crop": "Maize" },
  { "location": "Jaipur", "climate": "Arid", "soil": "Sandy", "crop": "Barley" },
  { "location": "Lucknow", "climate": "Subtropical", "soil": "Silty", "crop": "Potatoes" },
  { "location": "Guwahati", "climate":"Moderate", "soil":"Silty", "crop":"Rice"},
  { "location": "Silchar", "climate": "Moderate", "soil":"Silty", "crop": "Wheat"}
];

// Create a decision tree using the training data
const dt = new DecisionTree('crop', ['location', 'climate', 'soil']);
dt.train(training_data);

// Route for getting crop suggestions based on location, climate and soil data
router.post('/getCrops', async (req, res) => {
  try {
    // Get the user's location using the getLocation module
    const { latitude, longitude } = await getLocation();
    
    // Use the getCrops module to get the climate and soil data for the user's location
    const { climate, soil } = await getCrops(latitude, longitude);

    // Use the decision tree to predict the crops to be grown in the user's location
    const crops = dt.predict({ location: "user location", climate, soil });

    // Send the crop suggestions as a response
    res.json({
      success: true,
      crops
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occurred while fetching crop suggestions."
    });
  }
});
module.exports = router;

// // Mount the router on the app
// app.use('/', router);

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000
