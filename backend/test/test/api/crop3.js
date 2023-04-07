// cropPredictor.js

const decisionTree = require('decision-tree');
const training_data = require('../crop-data');

// Create a decision tree based on the training data
const dt = new decisionTree(training_data, 'crop', ['location', 'climate', 'soil', 'month']);

// Function to predict crops based on given inputs
router.post('/', async(req, res) => {
    const {climate, soil,location,month } = req.body;

  // Use the decision tree to make predictions
  const predictions = dt.predict({
    location: data.location || location,
    climate: data.climate || climate, 
    soil: data.soil || soil,
    month: data.month || month
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
  
  console.log(crops);

  res.json({
    success: true,
    crops
  });
});


module.exports = router;
