import React, { useEffect, useState } from 'react';
import Countries from './Components/Countries';
import Box from './Components/Box';
import Modal from './Components/Modal';
import Table from './Components/Table';
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { API_URL } from './constants';

const CompanyApp = ({ user }) => {
  // Table data
  const [data, setData] = useState([]);
  const [body, setBody] = useState([]);

  // Modal for company creation
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create company data
  const [countryComp, setCountryComp] = useState(1);
  const [nitComp, setNitComp] = useState('');
  const [dvComp, setDvComp] = useState('');
  const [nameComp, setNameComp] = useState('');
  const [addressComp, setAddressComp] = useState('');
  const [phoneComp, setPhoneComp] = useState('');

  // Opens modal for company creation
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  // Opens modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Execute fetchData function
  useEffect(() => {
    fetchData();
  }, []);

  // Delete company from DB
  const handleDelete = (id) => {
    try {
      fetch(`${API_URL}/deleteCompany`, {
        method: 'put',
        body: JSON.stringify({
          'NIT': id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(
        (response) => response.json()
      ).then((data) => {
        fetchData();
      }).catch((err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Execute request to get companies and set result to data varible
  const fetchData = async () => {
    try {
      fetch(`${API_URL}/getCompanies`).then((response) => {
  			response.json().then((jsonResponse) => {
          (jsonResponse.length > 0) ? 
          setBody(jsonResponse.map((item) => (
              <tr key={item.NIT}>
                <td>{item.NIT}</td>
                <td>{item.dv}</td>
                <td>{item.name}</td>
                <td>{item.country}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                {(user.getItem('rol')*1 === 1)? 
                  <td>
                    <button className="open-button" onClick={() =>handleDelete(item.NIT)}> <AiOutlineDelete /> Delete</button>
                  </td> : <></>
                }
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

  // Sends modal data and creates new company
  const handleSubmitCompany = (e) => {
    e.preventDefault();

    try {

      fetch(`${API_URL}/createCompany`, {
        method: 'post',
        body: JSON.stringify({
          'country': countryComp,
          'nit': nitComp,
          'dv': dvComp,
          'name': nameComp,
          'address': addressComp,
          'phone': phoneComp,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(
        (response) => response.json()
      ).then((data) => {
        fetchData();
        closeModal();
      }).catch((err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Creates form component for company creation
  const boxBody = <form onSubmit={handleSubmitCompany}>
      <div className='input-container'>
        <label>Country</label>
        <Countries setValue={setCountryComp}></Countries>
      </div>
      <div className='input-container'>
        <label>NIT</label>
        <input placeholder="Enter NIT" type="number" value={nitComp} onChange={(e) => setNitComp(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>DV</label>
        <input placeholder="Enter DV" type="number" value={dvComp} onChange={(e) => setDvComp(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>Name</label>
        <input placeholder="Enter Name" type="text" value={nameComp} onChange={(e) => setNameComp(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>Address</label>
        <input placeholder="Enter Address" type="text" value={addressComp} onChange={(e) => setAddressComp(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>Phone</label>
        <input placeholder="Enter Phone" type="number" value={phoneComp} onChange={(e) => setPhoneComp(e.target.value)}/>
      </div>
      <div className='input-container'>
        <button type="submit">Create</button>
      </div>
    </form>

  // Headers for table
  const headers = [
    {'name': 'NIT'},
    {'name': 'DV'},
    {'name': 'Name'},
    {'name': 'Country'},
    {'name': 'Address'},
    {'name': 'Phone'},
  ];

  // Validates user type for permissions
  if (user.getItem('rol')*1 === 1) {
    headers.push({'name': 'Actions'});
  }

  // Returns Company component with modal, table and the other elements integrated
  return (
    <div>
      <div className='table-container'>
        <div className='table-container-header'>
          <h1>Companies</h1>
          {(user.getItem('rol')*1 === 1 &&
            <button onClick={openModal} className="open-button"><AiOutlinePlus />Create</button>
          )}
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Box header={<h1>Create Company</h1>} body={boxBody}/>
        </Modal>
        <Table data={ data } headers={ headers } body={ body }></Table>
      </div>
    </div>
  );
};

export default CompanyApp;
