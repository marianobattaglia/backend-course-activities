const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

let productListDB = [
  { id: 1, title: 'iphone se 2022 256gb', price: 520, thumbnail: 'http://localhost:8080/public/iphone-se-2022.jpg' },
  { id: 2, title: 'iphone 13 pro max 512gb', price: 1700, thumbnail: 'http://localhost:8080/public/iphone-13-pro-max.jpeg' },
  { id: 3, title: 'macbook pro m1 8gb 512gb', price: 2000, thumbnail: 'http://localhost:8080/public/macbook-pro-m1.jpeg' },
];

// ---- ROUTES ----
app.get('/', (req, res) => {
  res.send({
    endpoints: [
      {
        description: 'Get all products from data base',
        url: 'http://localhost:8080/products',
      },
      {
        description: 'Get a product from ID, for exaple if you need the product ID 1 use this url',
        url: 'http://localhost:8080/products/1',
      },
      {
        description: 'Form to POST new products',
        url: 'http://localhost:8080/form',
      },
    ],
  });
});

app.get('/products', (req, res) => {
  res.render('pages/products', { title: 'Product List', products: productListDB });
});

app.get('/form', (req, res) => {
  res.render('pages/form', { title: 'Product cretion form' });
});

app.post('/products', (req, res) => {
  const { body } = req;
  productListDB.push(body);
  res.render('pages/products', { title: 'Product List', products: productListDB });
});

app.get('/products/:id', (req, res) => {
  let { id } = req.params;
  const found = productListDB.find((e) => e.id == id);
  if (found) {
    res.render('pages/product', { title: 'Product detail', product: found });
  } else {
    res.render('pages/error', { msg: 'Error getting product' });
  }
});
