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
  const [page, setPage] = useState(() => {
    const { pathname } = window.location;
    const page = pathname.slice(1)
    return page;
  });
  
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);
  const [bodyCart, setBodyCart] = useState('');

  const win = window.sessionStorage

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

  const goToPage = page => () => {
    setPage(page)
  }

  const handleSignOut = () => {
    win.removeItem('user')
    window.location.href = window.location.origin; 
  }

  const removeFromCart = (key) => {
    const currentCart = JSON.parse(win.getItem('cart'));
    delete currentCart[key];
    win.setItem('cart', JSON.stringify(currentCart));
    openCartModal();
  }

  const orderProducts = () => {
    closeCartModal();
    win.setItem('cart', JSON.stringify([]));
    alert('Products Orderd');
  }

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

  const closeCartModal = () => {
    setIsModalCartOpen(false);
  };

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
