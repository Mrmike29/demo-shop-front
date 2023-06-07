import React, { useEffect, useState } from 'react';
import Table from './Components/Table';
import { AiOutlineMail } from 'react-icons/ai';
import { API_URL } from '../constants';

// our components

const InventoryApp = ({ user }) => {
  // Table data
  const [data, setData] = useState([]);
  const [body, setBody] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      fetch(`${API_URL}/getInventory`).then((response) => {
  			response.json().then((jsonResponse) => {
          (jsonResponse.length > 0) ? 
          setBody(jsonResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.stock}</td>
              </tr>
            )))
          : 
          setBody(
            <tr>
              <td colSpan={headers.length}>No data</td>
            </tr>
          )
				  setData(jsonResponse);
  			})
  		});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const headers = [
    {'name': 'Name'},
    {'name': 'Company'},
    {'name': 'Stock'},
  ];

  return (
    <div>
      <div className='table-container'>
        <div className='table-container-header'>
          <h1>Inventory</h1>
          <button onClick="" className="open-button">Download</button>
        </div>
        <Table data={data} headers={headers} body={body}></Table>
      </div>
    </div>
  );
};

export default InventoryApp;
