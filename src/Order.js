import React, { useEffect, useState } from 'react';
import Table from './Components/Table';
import { API_URL } from './constants';

const OrderApp = ({ user }) => {
  // Table data
  const [data, setData] = useState([]);
  const [body, setBody] = useState([]);


  // Execute fetchData function
  useEffect(() => {
    fetchData();
  }, []);


  // Creates table data and PDF body from requested data
  const fetchData = async () => {
    const request = (user.getItem('rol')*1 === 2)? `?id=${user.getItem('user')}` : ``;
    
    try {
      fetch(`${API_URL}/getOrders${request}`).then((response) => {
  			response.json().then((jsonResponse) => {
          (jsonResponse.length > 0) ? 
            setBody(jsonResponse.map((item, key) => (
                <tr key={item.id + '-' + key}>
                    <td>{item.number}</td>
                    <td>{item.email}</td>
                    <td>{item.product}</td>
                    <td>{item.quantity}</td>
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

  // Headers for table
  const headers = [
    {'name': 'Number'},
    {'name': 'User'},
    {'name': 'Product'},
    {'name': 'Quantity'},
  ];

  // Returns Orders component with data, table and the other elements integrated
  return (
    <div>
      <div className='table-container'>
        <div className='table-container-header'>
          <div><h1>Orders</h1></div>
        </div>
        <Table data={data} headers={headers} body={body}></Table>
      </div>
    </div>
  );
};

export default OrderApp;
