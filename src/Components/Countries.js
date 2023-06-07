import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';

function Countries({ setValue }) {
  const [countries, setCountries] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setValue(event.target.value)
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
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
