import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';

function Companies({ setValue }) {
  const [companies, setCompanies] = useState([]);
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
      fetch(`${API_URL}/getCompanies`).then((response) => {
        response.json().then((jsonResponse) => {
            setCompanies(jsonResponse);
        })
      }); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <select value={selectedOption} onChange={handleSelectChange}>
      <option key={0} value={0}>Select Company</option>
      {companies.map((item) => (
        <option key={item.id} value={item.NIT}>{ item.name }</option>
      ))}
    </select>
  );
}

export default Companies;
