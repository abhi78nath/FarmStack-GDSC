const express = require('express');
const bodyParser = require('body-parser');
const DecisionTree = require('decision-tree');

const app = express();
const router = express.Router();
app.use(bodyParser.json());

// Load the data into a variable
const training_data = [
    { "location": "Mumbai", "climate": "Tropical", "soil": "Sandy", "month": "Jan", "crop": "Tomatoes" },
    { "location": "Delhi", "climate": "Semi-Arid", "soil": "Clay", "month": "Feb", "crop": "Corn" },
    { "location": "Guwahati", "climate":"Moderate", "soil":"Silty", "month": "Mar", "crop":"Rice"},
    { "location": "Bengaluru", "climate": "Tropical", "soil": "Red", "month": "Apr", "crop": "Rice" },
    { "location": "Jaipur", "climate": "Arid", "soil": "Sandy", "month": "May", "crop": "Barley" },
    { "location": "Silchar", "climate": "Moderate", "soil":"Silty", "month": "Jun", "crop": "Wheat"},
    { "location": "Ahmedabad", "climate": "Arid", "soil": "Silty", "month": "Jul", "crop": "Groundnuts" },
    { "location": "Chennai", "climate": "Tropical", "soil": "Sandy", "month": "Aug", "crop": "Sugarcane" },
    { "location": "Kolkata", "climate": "Subtropical", "soil": "Alluvial", "month": "Sep", "crop": "Wheat" },
    { "location": "Kolkata", "climate": "Subtropical", "soil": "Silty", "month": "Oct", "crop": "Rice" },
    { "location": "Pune", "climate": "Tropical", "soil": "Red", "month": "Nov", "crop": "Maize" },
    { "location": "Lucknow", "climate": "Subtropical", "soil": "Silty", "month": "Dec", "crop": "Potatoes" },
    { "location": "Hyderabad", "climate": "Tropical", "soil": "Black", "month": "Jan", "crop": "Cotton" },
  ];
  
  const test_data = [
    { "location": "Mumbai", "climate": "Tropical", "soil": "Sandy", "month": "Jan", "crop": "Tomatoes" },
    { "location": "Delhi", "climate": "Semi-Arid", "soil": "Clay", "month": "Feb", "crop": "Corn" },
    { "location": "Kolkata", "climate": "Subtropical", "soil": "Alluvial", "month": "Sep", "crop": "Wheat" },
    { "location": "Lucknow", "climate": "Subtropical", "soil": "Silty", "month": "Dec"}
  ]

var class_name = "crop";
var features = ["location", "climate", "soil", "month"];

var dt = new DecisionTree(class_name, features);
dt.train(training_data);


router.post('/', async(req, res) => {

    // const location = await getLocation()
    const {climate, soil, location, month } = req.body;
    
    // Use the decision tree to make predictions
    const predictions = dt.predict({
      location,
      climate,
      soil,
      month
    });
    
    // Filter the crops that match the given conditions
    const crops = training_data.filter((crop) => {
      for (const key in predictions) {
        if (predictions.hasOwnProperty(key) && crop[key] !== predictions[key]) {
          return false;
        }
      }
      return true;
    }).map((crop) => crop.crop);
  
    // Return the result as a response
    res.json({
      success: true,
      crops
    });
  });
  
  
  


module.exports = router;
