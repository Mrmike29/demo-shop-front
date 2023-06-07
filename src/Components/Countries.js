import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';

function Countries({ setValue }) {
  // Variables for countries
  const [countries, setCountries] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  // Set new value to select onChange
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setValue(event.target.value)
  };

  // Execute fetchData function
  useEffect(() => {
    fetchData();
  }, []);
  
  // Execute request to get countries and set result to countries varible
  const fetchData = async () => {
    // Fetch to get countries
    try {
      fetch(`${API_URL}/getCountries`).then((response) => {
        response.json().then((jsonResponse) => {
          setCountries(jsonResponse);
        })
      }); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Create select component to choose country from countries variable
  return (
    <select value={selectedOption} onChange={handleSelectChange}>
      <option key={0} value={0}>Select Country</option>
      {countries.map((item) => (
        <option key={item.id} value={item.id}>{ item.name }</option>
      ))}
    </select>
  );
}

export default Countries;
