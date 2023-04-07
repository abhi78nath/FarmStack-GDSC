const express = require('express');
const router = express.Router();

// Define the list of schemes
const schemes = [
  {
    id: 1,
    name: "Agriculture Scheme",
    description: "This scheme aims to promote and support the growth of the agriculture sector."
  },
  {
    id: 2,
    name: "Rural Development Scheme",
    description: "This scheme aims to improve the standard of living in rural areas."
  },
  {
    id: 3,
    name: "Healthcare Scheme",
    description: "This scheme aims to provide better healthcare facilities to the citizens."
  }
];

// Define a route to return the list of schemes
router.get("/", (req, res) => {
  res.json(schemes);
});

module.exports = router;
