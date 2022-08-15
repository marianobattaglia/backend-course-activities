const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [
  { id: 1, title: 'iphone se 2022 256gb', price: 520, thumbnail: 'http://localhost:8080/public/iphone-se-2022.jpg' },
  { id: 2, title: 'iphone 13 pro max 512gb', price: 1700, thumbnail: 'http://localhost:8080/public/iphone-13-pro-max.jpeg' },
  { id: 3, title: 'macbook pro m1 8gb 512gb', price: 2000, thumbnail: 'http://localhost:8080/public/macbook-pro-m1.jpeg' },
];

app.get('/products', (req, res) => {
  if (productsHC.length > 0) {
    res.render('products.pug', { title: 'Product list', products: productsHC });
  } else {
    res.render('error.pug', { msg: 'Cannot get products' });
  }
});

app.post('/products', (req, res) => {
  const { body } = req;
  productsHC.push(body);
  res.render('products.pug', { title: 'Products', products: productsHC });
});

app.get('/products/:id', (req, res) => {
  let { id } = req.params;
  const productFinded = productsHC.find((e) => e.id == id);
  if (productFinded) {
    res.render('oneProduct.pug', { title: 'Product', item: productFinded });
  } else {
    res.render('error.pug', { msg: 'Product not found' });
  }
});

app.get('/form', (req, res) => {
  res.render('form.pug', {});
});
