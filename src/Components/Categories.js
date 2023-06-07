import React, { useEffect, useState } from 'react';
import { API_URL } from '../constants';

function Categories({ setValue }) {
  // Variables for categories
  const [categories, setCategories] = useState([]);
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
  
  // Execute request to get categories and set result to categories varible
  const fetchData = async () => {
    // Fetch to get categories
    try {
      fetch(`${API_URL}/getCategories`).then((response) => {
        response.json().then((jsonResponse) => {
          setCategories(jsonResponse);
        })
      }); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Create select component to choose category from categories variable
  return (
    <select value={selectedOption} onChange={handleSelectChange}>
      <option key={0} value={0}>Select Category</option>
      {categories.map((item) => (
        <option key={item.id} value={item.id}>{ item.name }</option>
      ))}
    </select>
  );
}

export default Categories;
