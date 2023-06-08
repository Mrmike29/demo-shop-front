import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';

function Companies({ setValue }) {
  // Variables for companies
  const [companies, setCompanies] = useState([]);
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
  
  // Execute request to get companies and set result to companies varible
  const fetchData = async () => {
    // Fetch to get companies
    try {
      fetch(`${API_URL}/getCompanies`).then((response) => {
        response.json().then((jsonResponse) => {
            setCompanies(jsonResponse);
        })
      }); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Create select component to choose company from companies variable
  return (
    <select value={selectedOption} onChange={handleSelectChange}>
      <option key={0} value={0}>Select Company</option>
      {companies.map((item) => (
        <option key={item.NIT} value={item.NIT}>{ item.name }</option>
      ))}
    </select>
  );
}

export default Companies;
