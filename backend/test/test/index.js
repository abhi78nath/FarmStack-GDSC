const express = require("express");
const bodyParser = require("body-parser");
const cropAdvisor = require("./api/crop4");
const app = express();
app.use(bodyParser.json());

// app.use(cors());s
app.use(express.json());

app.use("/api/cropAdvisor", cropAdvisor);

const getLocation = require('./api/location');

getLocation().then(location => {
console.log(location);
}).catch(error => {
console.error(error);
});

app.listen(3000, (req,res)=> {
    console.log("Starting")
})