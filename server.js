const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('./build'));

const sessions = require('./sessions');
const menus = require('./Menu');
const users = require('./users');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

// login 
app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  res.cookie('sid', sid);

  users.carts[username] ||= {};
  const response = { username, cart: users.carts[username] };

  res.json(response);
});

// menu page
app.get('/api/menu', (req, res) => {
  res.json(menus.menuItems);
});

// cart page
app.get('/api/cart', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const cart = users.carts[username] || "";
  res.json({ cart });
});

//add cart Item
app.put('/api/carts/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;

  const cart = users.carts[username] || {};
  const item = cart[id];

  if (!item) {
    cart[id] = menus.createCartItem(id);
  }

  cart[id].amount += 1; 

  users.carts[username] = cart; 

  res.json({ cart: cart[id] }); 
});

// remove cart item
app.put('/api/carts/:id/decrease', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;

  const cart = users.carts[username] || {};
  const item = cart[id];

  if (!item) {
    cart[id] = menus.createCartItem(id);
  }

  cart[id].amount = Math.max(0, cart[id].amount - 1);

  if (cart[id].amount === 0) {
    delete cart[id];
  }

  users.carts[username] = cart;

  res.json({ cart: cart[id] });
});


// checkout
app.delete('/api/cart', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  users.carts[username] = {};
  res.json({ message: 'Cart reset successful' });
});


// logout
app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    sessions.deleteSession(sid);
  }
  res.json({ wasLoggedIn: !!username }); 
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});