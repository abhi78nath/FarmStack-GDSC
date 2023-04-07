import React, { useState, useEffect } from 'react';
const getLocation = require('./currentLoc');

const CropInputForm = () => {
const [climate, setClimate] = useState('');
const [soil, setSoil] = useState('');
const [crops, setCrops] = useState('');
const [isLoading, setLoading] = useState(false);
const [location, setLocation] = useState('');

useEffect(() => {
const getUserLocation = async () => {
try {
const userLocation = await getLocation();
setLocation(userLocation.city);
} catch (error) {
console.error(error);
}
};
getUserLocation();
}, []);

const handleSubmit = async (event) => {
event.preventDefault();
setLoading(true);
try {
const response = await fetch('http://localhost:5000/api/cropAdvisor', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
location,
climate,
soil
})
});
const result = await response.json();
setCrops(result.crops);
} catch (error) {
console.error(error);
}
setLoading(false);
};

return (
<div>
<form onSubmit={handleSubmit}>
<label>
Climate:
<select value={climate} onChange={event => setClimate(event.target.value)}>
<option value="">Select Climate</option>
<option value="Tropical">Tropical</option>
<option value="Semi-Arid">Semi-Arid</option>
<option value="Arid">Arid</option>
<option value="Subtropical">Subtropical</option>
<option value="Moderate">Moderate</option>
</select>
</label>
<br />
<br />
<label>
Soil:
<select value={soil} onChange={event => setSoil(event.target.value)}>
<option value="">Select Soil</option>
<option value="Sandy">Sandy</option>
<option value="Clay">Clay</option>
<option value="Red">Red</option>
<option value="Black">Black</option>
<option value="Silty">Silty</option>
<option value="Alluvial">Alluvial</option>
</select>
</label>
<br />
<br />
<button type="submit">Predict Crop</button>
</form>
{isLoading ? (
<div>Loading...</div>
) : (
<div>
<h2>Predicted Crop: {crops}</h2>
</div>
)}
</div>
);
};

export default CropInputForm;



