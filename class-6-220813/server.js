const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = process.env.PORT || 8080;

// Sockets Initialization
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

// Start HTTP Server
httpServer.listen(PORT, () => console.log(`HTTP Server listening to the PORT ${PORT}`));
httpServer.on('error', (error) => console.log(`Server error: ${error}`));

// Use
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars Engine Config
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

// Products Mock
let productListDB = [
  { id: 1, title: 'iphone se 2022 256gb', price: 520, thumbnail: 'http://localhost:8080/public/iphone-se-2022.jpg' },
  { id: 2, title: 'iphone 13 pro max 512gb', price: 1700, thumbnail: 'http://localhost:8080/public/iphone-13-pro-max.jpeg' },
  { id: 3, title: 'macbook pro m1 8gb 512gb', price: 2000, thumbnail: 'http://localhost:8080/public/macbook-pro-m1.jpeg' },
];

// ---- ROUTES ----
// http://localhost:8080/ (Root): This route contains the exercise
app.get('/', (req, res) => {
  res.render('chat', { products: productListDB, productsExist: true });
});

app.post('/', (req, res) => {
  const { body } = req;
  productListDB.push(body);
});

// http://localhost:8080/products
app.get('/products', (req, res) => {
  if (productListDB.length !== 0) {
    res.render('productslist', { products: productListDB, productsExist: true });
  } else {
    res.render('error', { errorMessage: 'Products not found' });
  }
});
app.post('/products', (req, res) => {
  const { body } = req;
  productListDB.push(body);
  res.render('productslist', { products: productListDB, productsExist: true });
});

// http://localhost:8080/:id
app.get('/products/:id', (req, res) => {
  let { id } = req.params;
  try {
    let found = productListDB.find((element) => element.id == id);
    if (found) {
      res.render('oneProduct', { product: found, title: 'Detalle de Producto' });
    } else {
      res.render('error', { errorMessage: 'Producto no encontrado' });
    }
  } catch (error) {}
});

// http://localhost:8080/form
app.get('/form', (req, res) => {
  res.render('form');
});

// ---- WEBSOCKETS -> CHAT ----
// Init chat with an empty array
let chat = [];

// Websockets configuration
io.on('connection', (socket) => {
  // Connection event
  console.log('User online' + socket.id);
  chat.push(`User ${socket.id} has joined the Chat`);
  io.sockets.emit('arr-chat', chat);

  // Chatting messages event
  socket.on('data-chat', (data) => {
    //Forbidden words filter example
    data = data.replace('malo', 'mal**');
    //Push message to chat "array"
    chat.push(data);
    io.sockets.emit('arr-chat', chat);
  });

  // Product Creation
  socket.on('new-product', (data) => {
    productListDB.push(data);
    io.sockets.emit('newProducts', productListDB);
  });
});
