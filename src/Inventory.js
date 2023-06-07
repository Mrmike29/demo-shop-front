import React, { useEffect, useState } from 'react';
import { pdf, PDFDownloadLink, Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import Table from './Components/Table';
import { AiOutlineCloudDownload, AiOutlineMail } from 'react-icons/ai';
import { API_URL } from './constants';

// our components

const InventoryApp = ({ user }) => {
  // Table data
  const [data, setData] = useState([]);
  const [body, setBody] = useState([]);
  const [pdfDoc, setPdfDoc] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      flexDirection: 'column',
      color: "white",
    },
    title: {
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#282c34'
    },
    table: { 
      margin: 10,
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableColHeader: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0,
      backgroundColor: '#282c34'
    },
    tableCol: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    },
    tableCellHeader: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 ,
      color: 'white',
    }, 
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 ,
      color: 'black'
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
  });

  const fetchData = async () => {
    try {
      fetch(`${API_URL}/getInventory`).then((response) => {
  			response.json().then((jsonResponse) => {
          (jsonResponse.length > 0) ? 
          setBody(jsonResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.currency}</td>
                <td>{item.stock}</td>
              </tr>
            )))
          : 
          setBody(
            <tr>
              <td colSpan={headers.length}>No data</td>
            </tr>
          )

          setPdfDoc(
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.title}>
                    <Text>Online Shop - Inventory</Text>
                  </View>
                  <View style={styles.table}> 
                    <View style={styles.tableRow}> 
                      <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Name</Text> 
                      </View> 
                      <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Company</Text> 
                      </View> 
                      <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Currency</Text> 
                      </View> 
                      <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Price</Text> 
                      </View> 
                    </View>
                    {data.map((item) => (
                      <View style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                          <Text style={styles.tableCell}>{item.name}</Text> 
                        </View> 
                        <View style={styles.tableCol}> 
                          <Text style={styles.tableCell}>{item.company}</Text> 
                        </View> 
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCell}>{item.currency}</Text> 
                        </View>
                        <View style={styles.tableCol}> 
                          <Text style={styles.tableCell}>{item.stock}</Text> 
                        </View>
                      </View> 
                     ))}
                  </View>
                </Page>
             </Document>
          );
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
    {'name': 'Currency'},
    {'name': 'Stock'},
  ];

  const generatePDF = () => {

    const blobPromise = pdf(pdfDoc).toBlob();

    blobPromise.then((blob) => {
      try {
        const formData = new FormData();
        formData.append('pdf', blob);

        fetch(`${API_URL}/send`, {
          method: 'post',
          mode: 'no-cors',
          body: formData,
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
    });
    // Convert the PDF document to a data URL
    // const dataUrl = URL.createObjectURL(dfd);

    
  };

  return (
    <div>
      <div className='table-container'>
        <div className='table-container-header'>
          <div><h1>Inventory</h1></div>
          <div style={{display: 'flex'}}>
            <button className="open-button">
              <AiOutlineCloudDownload />
              <PDFDownloadLink document={pdfDoc} fileName="inventary.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
              </PDFDownloadLink>
            </button>
            <button onClick={generatePDF} className="open-button"><AiOutlineMail /> Email</button>
          </div>
        </div>
        <Table data={data} headers={headers} body={body}></Table>
      </div>
    </div>
  );
};

export default InventoryApp;
