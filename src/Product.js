import React, { useEffect, useState } from 'react';
import Companies from './Components/Companies';
import Categories from './Components/Categories';
import Box from './Components/Box';
import Modal from './Components/Modal';
import Table from './Components/Table';
import { AiOutlinePlus, AiOutlineDelete, AiOutlineShoppingCart } from 'react-icons/ai';
import { API_URL } from './constants';

const ProductApp = ({ user, reRender, setReRender }) => {
  // Table data
  const [data, setData] = useState([]);
  const [body, setBody] = useState([]);

  // Modal for add to cart
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [idCart, setidCart] = useState(0);
  const [companyCart, setCompanyCart] = useState(0);
  const [categoryCart, setCategoryCart] = useState(0);
  const [nameCart, setNameCart] = useState('');
  const [currencyCartTo, setCurrencyCartTo] = useState('');
  const [currencyCartFrom, setCurrencyCartFrom] = useState('');
  const [priceCartTo, setPriceCartTo] = useState(0);
  const [priceCartFrom, setPriceCartFrom] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Create product data
  const [companyProd, setCompanyProd] = useState(0);
  const [categoryProd, setCategoryProd] = useState(0);
  const [nameProd, setNameProd] = useState('');
  const [descriptionProd, setDescriptionProd] = useState('');
  const [stockProd, setStockProd] = useState(1);
  const [priceProd, setPriceProd] = useState(1);

  // Execute fetchData function
  useEffect(() => {
    fetchData();
  }, []);

  // Headers for table
  const headers = [
    {'name': 'Name'},
    {'name': 'Category'},
    {'name': 'Description'},
    {'name': 'Company'},
    {'name': 'Price'},
    {'name': 'Currency'},
    {'name': 'Stock'},
    {'name': 'Actions'},
  ];

  // Delete product from DB
  const handleDelete = (id) => {
    try {

      fetch(`${API_URL}/deleteProduct`, {
        method: 'put',
        body: JSON.stringify({
          'id': id,
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

  // Execute request to get products and set result to data varible
  const fetchData = async () => {
    try {
      fetch(`${API_URL}/getProducts`).then((response) => {
  			response.json().then((jsonResponse) => {
          (jsonResponse.length > 0) ? 
          setBody(jsonResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.company}</td>
                <td>{item.price}</td>
                <td>{item.currency}</td>
                <td>{item.stock}</td>
                <td>
                  {
                    (
                      JSON.parse(user.getItem('cart')).filter((i) => 
                        (i !== null)? i.id === item.id : '').length > 0)?
                      <></> :
                      <button className="open-button" onClick={() => openOrderModal(item.id)}> <AiOutlineShoppingCart /> Add </button>
                  }
                  {(user.getItem('rol')*1 === 1)? 
                    <button className="open-button" onClick={() =>handleDelete(item.id)}> <AiOutlineDelete /> Delete</button>: <></>
                  }
                </td>
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

  if (reRender) {
    fetchData();
    setReRender(false);
  }

  // Opens modal creation
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal creation
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Gets product data and creates new product
  const handleSubmitProduct = (e) => {
    e.preventDefault();

    if (companyProd === 0) {
      alert("Company is Required")
      return
    }

    if (categoryProd === 0) {
      alert("Company is Required")
      return
    }

    try {

      fetch(`${API_URL}/createProduct`, {
        method: 'post',
        body: JSON.stringify({
          'company': companyProd,
          'category': categoryProd,
          'name': nameProd,
          'description': descriptionProd,
          'stock': stockProd,
          'price': priceProd,
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

  // Creates form component for product creation
  const boxBody = <form onSubmit={handleSubmitProduct}>
      <div className='input-container'>
        <label>Company</label>
        <Companies setValue={setCompanyProd}></Companies>
      </div>
      <div className='input-container'>
        <label>Category</label>
        <Categories setValue={setCategoryProd}></Categories>
      </div>
      <div className='input-container'>
        <label>Name</label>
        <input placeholder="Enter your name" type="text" value={nameProd} onChange={(e) => setNameProd(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>Description</label>
        <input placeholder="Enter your Last Name" type="text" value={descriptionProd} onChange={(e) => setDescriptionProd(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>Stock</label>
        <input placeholder="Enter your Phone" type="number" value={stockProd} onChange={(e) => setStockProd(e.target.value)}/>
      </div>
      <div className='input-container'>
        <label>Price (Company Currency)</label>
        <input placeholder="Enter your Phone" type="number" value={priceProd} onChange={(e) => setPriceProd(e.target.value)}/>
      </div>
      <div className='input-container'>
        <button type="submit">Create</button>
      </div>
    </form>

  // Add product to Cart
  const handleSetCart = (id, nameP, currency, price, quan) => {
    const currentCart = JSON.parse(user.getItem('cart'));
    currentCart.push({id, nameP, currency, price, quan});
    user.setItem('cart', JSON.stringify(currentCart));

    fetchData();
    closeOrderModal();
    setQuantity(1);
  }

  // Opens cart modal with product data
  const openOrderModal = (id) => {
    try {
      fetch(`${API_URL}/getProducts?id=${id}`).then((response) => {
  			response.json().then((jsonResponse) => {
          setidCart(id);
          setCompanyCart(jsonResponse[0].company);
          setCategoryCart(jsonResponse[0].category);
          setNameCart(jsonResponse[0].name);
          setCurrencyCartTo(jsonResponse[0].currency);
          setCurrencyCartFrom(jsonResponse[0].currency);
          setPriceCartTo(jsonResponse[0].price);
          setPriceCartFrom(jsonResponse[0].price);
  			})
  		});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsModalOrderOpen(true);
  };

  // Close cart modal
  const closeOrderModal = () => {
    setIsModalOrderOpen(false);
  };

  // Handle currency select changes
  const handleSelectCurrency = async (e) => {
    setCurrencyCartTo(e.target.value)
    changeCurrency(e.target.value)
  }

  // Coverts currency for cart
  // cCT: changeCurrencyTo
  const changeCurrency = (cCT) => {
    try {
      fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCartFrom.toLowerCase()}.json`).then((response) => {
  			response.json().then((jsonResponse) => {
          setPriceCartTo(Math.ceil(eval(`jsonResponse.${currencyCartFrom.toLowerCase()}.${cCT.toLowerCase()}`))*priceCartFrom)
  			})
  		});
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Creates form component for cart addition
  const bodyCart = <form onSubmit={(e) => {e.preventDefault()}}>
    <div className='input-container'>
      <label>Company</label>
      <input type="text" value={companyCart} readOnly={true}/>
    </div>
    <div className='input-container'>
      <label>Category</label>
      <input type="text" value={categoryCart} readOnly={true}/>
    </div>
    <div className='input-container'>
      <label>Name</label>
      <input type="text" value={nameCart} readOnly={true}/>
    </div>
    <div className='input-container'>
      <label>Currency</label>
      <select value={currencyCartTo} onChange={handleSelectCurrency}>
        <option value='USD'>USD</option>
        <option value='COP'>COP</option>
        <option value='EUR'>EUR</option>
      </select>
    </div>
    <div className='input-container'>
      <label>Price</label>
      <input type="text" value={priceCartTo} readOnly={true}/>
    </div>
    <div className='input-container'>
      <label>Quantity</label>
      <input placeholder="Enter Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
    </div>
    <div className='input-container'>
      <button onClick={() => handleSetCart(idCart, nameCart, currencyCartTo, priceCartTo, quantity)}>Add</button>
    </div>
  </form>

  // Returns Product component with modal, table, Box and the other elements integrated
  return (
    <div>
      <div className='table-container'>
        <div className='table-container-header'>
          <h1>Products</h1>
          {(user.getItem('rol')*1 === 1 &&
            <button onClick={openModal} className="open-button"><AiOutlinePlus />Create</button>
          )}
        </div>
        <Modal isOpen={isModalOrderOpen} onClose={closeOrderModal}>
          <Box header={<h1>Add to Cart</h1>} body={bodyCart}/>
        </Modal>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Box header={<h1>Create Product</h1>} body={boxBody}/>
        </Modal>
        <Table data={data} headers={headers} body={body}></Table>
      </div>
    </div>
  );
};

export default ProductApp;
