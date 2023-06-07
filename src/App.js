import React, { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom'
import { AiTwotoneShop, AiOutlineMinus } from 'react-icons/ai';
import InventoryApp from './Inventory';
import CompanyApp from './Company';
import ProductApp from './Product';
import Login from './Login';
import Modal from './Components/Modal';
import Box from './Components/Box';
import './App.css';


const MainApp = () => {
  // Variable for handle changing view
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1)
    return page;
  });
  
  // Variables for cart modal component
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);
  const [bodyCart, setBodyCart] = useState('');

  // Variable for handle user and cart data
  const win = window.sessionStorage

  // Handle which view should be selected
  const getPage = () => {
    if (win.getItem('user') === null && page !== '') { 
      window.location.href = window.location.origin; 
      return
    }
    
    switch (page) {
      case '':
        if (win.getItem('user') !== null) { 
          window.location.href = `${window.location.origin}/products`; 
          return
        }
        return <Login user={win}/>
      case 'inventory':
        return <InventoryApp user={win}/>
      case 'companies':
        return <CompanyApp user={win}/>
      case 'products':
        return <ProductApp user={win}/>
      default:
        break;
    }
  }

  // Set new value to page variable
  const goToPage = page => () => {
    setPage(page)
  }

  // Removes user from sessionStorage and returns to login page
  const handleSignOut = () => {
    win.removeItem('user')
    window.location.href = window.location.origin; 
  }

  // Remove 1 item from the cart
  const removeFromCart = (key) => {
    const currentCart = JSON.parse(win.getItem('cart'));
    delete currentCart[key];
    win.setItem('cart', JSON.stringify(currentCart));
    openCartModal();
  }

  // Creates an order with the products from the cart
  const orderProducts = () => {
    closeCartModal();
    win.setItem('cart', JSON.stringify([]));
    alert('Products Orderd');
  }

  // Opens the cart modal and sets data from sessionStorage
  const openCartModal = () => {
    const currentCart = JSON.parse(win.getItem('cart'));

    setBodyCart( <div className='cart'>
      <div className='mini-list'>
        {currentCart.map((item, key) => 
          (item !== null)?
            <div className='mini-list-item' key={ key }>
              <div className='item-product'>
                <div className='item-product-info'>
                  <div className='item-name'>
                    { item.nameP }
                  </div>
                  <div className='item-data'>
                    <div className='item-data-container'>
                      <div className='item-data-title'>Currency: </div>
                      <div className='item-data-body'>{ item.currency }</div>
                    </div>
                    <div className='item-data-container'>
                      <div className='item-data-title'>Price: </div>
                      <div className='item-data-body'>{ item.price }</div>
                    </div>
                    <div className='item-data-container'>
                      <div className='item-data-title'>Quantity: </div>
                      <div className='item-data-body'>{ item.quan }</div>
                    </div>
                  </div>
                </div>
                <div className='item-product-actions'>
                  <div className='actions-container'>
                    <button onClick={() => removeFromCart(key)}><AiOutlineMinus /></button>
                  </div>
                </div>
              </div>
            </div> : <></>
            )}
        </div>
        <div className='cart-footer'>
          <button className='open-button' onClick={orderProducts}>Order</button>
        </div>
      </div>
    )

    setIsModalCartOpen(true);
  }

  // Close the cart modal
  const closeCartModal = () => {
    setIsModalCartOpen(false);
  };

  // Returns main component with header, body and footer integrated
  // Here is where every view is shown
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1><AiTwotoneShop /> Online Shop</h1>
          <div className='app-header-routes'>
            { win.getItem('user') !== null && <>
                <Link to='/products' onClick={goToPage('products')}>
                  Products
                </Link>
                <Link to='/companies' onClick={goToPage('companies')}>
                    Companies
                </Link>
                <Link to='/inventory' onClick={goToPage('inventory')}>
                  Inventory
                </Link>
                <Link onClick={() => openCartModal()}>
                  Cart
                </Link>
                <Link onClick={() => handleSignOut()}>
                  Sign Out
                </Link>
              </>
            }
          </div>
        </header>
        <main className="app-content">
          {getPage()}
        </main>
        <footer className="app-footer">
          <p>This is a Demo!!!</p>
        </footer>
        <Modal isOpen={isModalCartOpen} onClose={closeCartModal}>
          <Box header={<h1>My Cart</h1>} body={bodyCart}/>
        </Modal>
      </div>
    </BrowserRouter>
  );
};

export default MainApp;
