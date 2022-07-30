const express = require("express");
const Contenedor = require("./class/contenedor");
const { Router } = express;

const app = express();
const router = Router();
const PORT = process.env.PORT || 8080;

const productos = new Contenedor(__dirname + "/data/productos.json");

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("./forms"));
app.use("/api/products", router);

//ROUTES
router.get("/", (req, res) => {
  res.json(productos.content);
});

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  res.json(productos.getById(id));
});

router.post("/", (req, res) => {
  let obj = req.body;
  res.json(productos.save(obj));
});

router.put("/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  res.json(productos.update(id, obj));
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  res.json(productos.deleteById(id));
});
