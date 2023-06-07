import React, { useEffect, useState } from 'react';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import Table from './Components/Table';
import { AiOutlineMail } from 'react-icons/ai';
import { API_URL } from './constants';

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

  const generatePDF = () => {
    const pdfDoc = (
      <Document>
        <Page>
          <Text>Hello, this is a PDF document.</Text>
        </Page>
      </Document>
    );

    // Convert the PDF document to a data URL
    const dataUrl = window.URL.createObjectURL(pdfDoc);

    // Pass the data URL to your PHP backend for email sending
    try {
      fetch(`${API_URL}/send`, {
        method: 'post',
        body: JSON.stringify({
          'pdf': dataUrl,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(
        (response) => response.json()
      ).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div className='table-container'>
        <div className='table-container-header'>
          <h1>Inventory</h1>
          <button onClick={generatePDF} className="open-button">Download</button>
        </div>
        <Table data={data} headers={headers} body={body}></Table>
      </div>
    </div>
  );
};

export default InventoryApp;
