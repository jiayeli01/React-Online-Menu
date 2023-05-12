import './App.css';
import { useState } from 'react';

import MenuPage from './MenuPage';
import LoginForm from './LoginForm';
import Logout from './Logout';
import CartButton from './CartButton';
import Cart from './Cart';
import Checkout from './Checkout';

import { fetchCart, fetchLogin, fetchLogout, fetchMenu, fetchCheckout } from './services';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState({});
  const [menu, setMenu] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  function onLogin( username ) {
    fetchLogin(username)
    .then((data) => {
      setIsLoggedIn(true);
      setUsername(data.username);
      setCart(data.cart);
      getMenu();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  function getMenu() {
    fetchMenu().then(data => setMenuItems(data));
  }
  
  function getCart(){
    fetchCart().then((data) => {
      setCart(data);
      setMenu(false);
    })
  }

  function onLogout() {
    setIsLoggedIn(false);
    setUsername('');
    setCart({});
    setMenu(true);
    fetchLogout().catch((error) => {console.log(error);});
  }

  function onCheckout() {
    fetchCheckout().then((data) => {
      setCart(data);
      setMenu(true);
    })
  }

  return (
    <div className="app">
      {isLoggedIn ? (
          <main>
              {menu ? (
              <div>
                <MenuPage menuItems = {menuItems}/>
                <div className='menu-buttons'>
                  <CartButton viewCart={getCart} />
                  <Logout onLogout={onLogout} />
                </div>
              </div>
            ) : (
              <div>
                <Cart cartItems={cart}/>
                <div className='cart-button'>
                  <Checkout oncheckout={onCheckout}/>
                  <Logout onLogout={onLogout} />
                </div>
              </div>
            )}
          </main>
        ) : (
          <LoginForm onLogin={onLogin} />
        )}
    </div>
  );
}

export default App;

