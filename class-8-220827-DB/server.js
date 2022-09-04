// Imports
// DataBase
const DBContainer = require('./DBContainer');
const { options: SQLite } = require('./options/sqlite');
const { options: MySQL } = require('./options/MySQL');
const chatDB = new DBContainer(SQLite, 'messages');
const productsDB = new DBContainer(MySQL, 'product');
// Express
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

// Products Mock (Replaced by MySQL)
/*
let productListDB = [
  { id: 1, title: 'iphone se 2022 256gb', price: 520, thumbnail: 'http://localhost:8080/public/iphone-se-2022.jpg' },
  { id: 2, title: 'iphone 13 pro max 512gb', price: 1700, thumbnail: 'http://localhost:8080/public/iphone-13-pro-max.jpeg' },
  { id: 3, title: 'macbook pro m1 8gb 512gb', price: 2000, thumbnail: 'http://localhost:8080/public/macbook-pro-m1.jpeg' },
];
*/

// Product DB
let productListDB = productsDB.getAll();

/* Creación de DB Messages */
/*
// Knex connection
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/ecommerce.sqlite',
  },
  useNullAsDefault: true,
});

knex.schema
  //Crear tabla en base de datos
  .createTable('messages', (table) => {
    table.increments('id'), table.string('email'), table.string('message');
  })
  .then(() => {
    console.log('todo bien');
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    //En Knex siempre hay que cortar la instancia
    knex.destroy();
  });
  */

// ---- ROUTES ----
// http://localhost:8080/ (Root): This route contains the exercise
app.get('/', (req, res) => {
  res.render('chat', { products: productListDB, productsExist: true });
});

// http://localhost:8080/products
// (Not in use for this exercise)
/*
app.get('/products', (req, res) => {
  if (productListDB.length !== 0) {
    res.render('productslist', { products: productListDB, productsExist: true });
  } else {
    res.render('error', { errorMessage: 'Products not found' });
  }
});
*/

/*
app.post('/products', (req, res) => {
  const { body } = req;
  productListDB.push(body);
  res.render('productslist', { products: productListDB, productsExist: true });
});
*/

// http://localhost:8080/:id
/*
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
*/

// http://localhost:8080/form
/*
app.get('/form', (req, res) => {
  res.render('form');
});
*/

// ---- WEBSOCKETS -> CHAT ----
// Init chat with an empty array
//let chat = [];

// Websockets configuration
io.on('connection', async (socket) => {
  //Aquí envío la tabla de productos al momento en que un cliente se conecta
  let products = await productsDB.getAll();
  let messages = await chatDB.getAll();

  socket.emit('newProducts', products);
  socket.emit('chat-actualizado', messages);

  //Aquí escucho cuando alguien agrega un producto, y, si se agregó, envío el mensaje a todas las terminales conectadas con la nueva lista actualizada
  socket.on('agregar-producto', async (productoPorAgregar) => {
    const productAdded = await productsDB.save(productoPorAgregar);
    let newProductsList = await productsDB.getAll();

    productAdded
      ? io.sockets.emit('newProducts', newProductsList)
      : socket.emit('agregar-producto-error', {
          mensaje: 'Error al intentar agregar el producto',
        });
  });

  socket.on('chat', async (newMessage) => {
    let addMessage = await chatDB.save(newMessage);
    let updatedChat = await chatDB.getAll();
    if (addMessage) {
      io.sockets.emit('chat-actualizado', updatedChat);
    } else {
      console.log('Ha ocurrido un problema al agregar el mensaje al chat');
    }
  });
});
