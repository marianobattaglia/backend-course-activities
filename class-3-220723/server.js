const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const Contenedor = require("./contenedor.js");

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

// http://localhost:8080/
app.get("/", (req, res) => {
  res.send({
    endpoints: [
      {
        id: 1,
        endpoint: "/productos",
        url: "http://localhost:8080/productos",
      },
      {
        id: 2,
        endpoint: "/productoRandom",
        url: "http://localhost:8080/productoRandom",
      },
    ],
  });
});

//Products initialization:
const productList = new Contenedor("products.txt");

/* --- ENDPOINTS --- */
// http://localhost:8080/productos
app.get("/productos", async (req, res) => {
  const products = await productList.getAll();
  res.send(products);
});

// http://localhost:8080/productoRandom
app.get("/productoRandom", async (req, res) => {
  const products = await productList.getAll();
  const randomIndex = Math.floor(Math.random() * products.length);
  res.send(products[randomIndex]);
});
