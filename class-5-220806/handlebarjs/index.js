const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));

app.use('/public', express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion del motor
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

let productListDB = [
  { id: 1, title: 'iphone se 2022 256gb', price: 520, thumbnail: 'http://localhost:8080/public/iphone-se-2022.jpg' },
  { id: 2, title: 'iphone 13 pro max 512gb', price: 1700, thumbnail: 'http://localhost:8080/public/iphone-13-pro-max.jpeg' },
  { id: 3, title: 'macbook pro m1 8gb 512gb', price: 2000, thumbnail: 'http://localhost:8080/public/macbook-pro-m1.jpeg' },
];

app.get('/products', (req, res) => {
  if (productListDB.length !== 0) {
    res.render('productslist', { products: productListDB, productsExist: true });
  } else {
    res.render('error', { errorMessage: 'Products not found' });
  }
});

app.get('/products/:id', (req, res) => {
  let { id } = req.params;
  try {
    let found = productListDB.find((element) => element.id == id);
    if (found) {
      res.render('oneProduct', { product: found, title: 'Product detail' });
    } else {
      res.render('error', { errorMessage: 'Product not found' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/products', (req, res) => {
  const { body } = req;
  productListDB.push(body);
  res.render('productslist', { products: productListDB, productsExist: true });
});
