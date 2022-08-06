const express = require("express");
const fs = require("fs");

const app = express();
const { Router } = express;
const router = Router();

const multer = require("multer");
const upload = multer();

const Contenedor = require("./public/container");
const route = "./public/productos.txt";
const fileRoute = new Contenedor(route);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
app.use("/api/productos", router);

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

app.use("/public", express.static(__dirname + "/public"));

server.on("error", (error) => console.log(`Server error: ${error}`));

// ---- ROUTES ----
app.get("/", (req, res) => {
  res.send({
    endpoints: [
      {
        ID: 1,
        description: "Get all products from data base",
        url: "http://localhost:8080/api/productos/",
      },
      {
        ID: 2,
        description:
          "Get a product from ID, for exaple if you need the product ID 1 use this url",
        url: "http://localhost:8080/api/productos/1",
      },
      {
        ID: 3,
        description: "Form to POST and PUT products",
        url: "http://localhost:8080/public/",
      },
    ],
  });
});

app.get("/public", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//POST (from form)
app.post("/public", async (req, res) => {
  const { body } = req;
  const obj = {
    title: body.title,
    price: parseFloat(body.price),
    thumbnail: body.thumbnail,
  };
  await fileRoute.save(obj);
  let products = await fileRoute.getAll();
  res.json(products);
});

//GET (api/productos)
router.get("/", async (req, res) => {
  try {
    let products = await fileRoute.getAll();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
});

//api/productos 	METODO GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let productById = await fileRoute.getById(id);
    if (productById != undefined) {
      res.json(productById);
    } else {
      res.json({ error: "Product ID not found" });
    }
  } catch (error) {
    console.log("error");
  }
});

//api/productos 	METODO POST
router.post("/", async (req, res) => {
  const { body } = req;
  await fileRoute.save(body);
  let products = await fileRoute.getAll();
  res.json(products);
});

//api/productos 	METODO PUT
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  let productos = await fileRoute.getAll();
  let productPut = productos.find((element) => element.id == id);

  if (productPut) {
    //Buscamos el producto con el id y modificamos su propiedad, sino existe pasamos al else
    productPut = { ...productPut, ...body };
    await fileRoute.update(id, productPut);
    res.json({
      success: "OK",
      Modified: productPut,
    });
  } else {
    res.json({ error: "Product not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await fileRoute.getAll();
  const productToDelete = productos.find((element) => element.id == id);
  if (productToDelete) {
    await fileRoute.deleteById(id);
    res.json({ success: "OK", productoEliminado: productToDelete });
  } else {
    res.json({ error: "Product not found" });
  }
});
