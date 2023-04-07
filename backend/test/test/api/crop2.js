const express = require('express');
const bodyParser = require('body-parser');
const DecisionTree = require('decision-tree');
// const getLocation = require('./testloc');


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
var features = ["location", "climate", "soil"]
// Train the decision tree algorithm using the data
// const dt = new DecisionTree(data, 'crop', ['location', 'climate', 'soil']);
var dt = new DecisionTree(class_name, features);
dt.train(training_data);
  // const crops = dt.predict({ location: location.city, climate, soil });
// getLocation().then(location => {
//   console.log(location);
// }).catch(error => {
//   console.error(error);
// });


router.post('/', async(req, res) => {

  // const location = await getLocation()
  const {climate, soil,location } = req.body;
  // const {city} = location;
  
  // Use the decision tree to make predictions
  // const crops = dt.predict({ location: location.city, climate:climate, soil:soil });
  const crops = [];

  // const crop = dt.predict({ location: location.city, climate:climate, soil:soil });
  test_data.forEach(data => {
    const crop = dt.predict({ location: data.location || location, climate: data.climate || climate, soil: data.soil || soil });
    crops.push(crop);
  })
  console.log(crops);
  // Return the result as a response
  res.json({
    success: true,
    crops
  });
});

// router.post('/', async(req, res) => {

//   // const location = await getLocation()
//   const {climate, soil, location } = req.body;
  
//   // Use the decision tree to make predictions
//   const crops = dt.predict({ location, climate, soil });

//   // Return the result as a response
//   res.json({
//     success: true,
//     crops
//   });
// });


module.exports = router;
