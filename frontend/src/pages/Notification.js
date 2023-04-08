import React, { useState, useEffect } from 'react';

const SchemesList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/schemes');
        const result = await response.json();
        setSchemes(result.schemes);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {schemes.map((scheme, index) => (
            <li key={index}>{scheme.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SchemesList;
