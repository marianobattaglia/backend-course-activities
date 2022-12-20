const CarritosService = require("../services/carritosService");
const ProductsService = require("../services/productsService");

const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
  const error = {
    error: -1,
  };
  if (ruta && metodo) {
    error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
  } else {
    error.descripcion = "no autorizado";
  }
  return error;
}

function soloAdmins(req, res, next) {
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin());
  } else {
    next();
  }
}

module.exports = class CarritosController {
  constructor() {
    this.carritos = new CarritosService();
    this.productos = new ProductsService();
  }

  getCarritos = async (req, res) => {
    res.json(await this.carritos.getCarritosService());
  };

  postCarritos = async (req, res) => {
    res.json(await this.carritos.saveCarritoService());
  };

  deleteByIdCarritos = async (req, res) => {
    res.json(await this.carritos.deleteByIdCarritoService(req.params.id));
  };

  /* Router - Products on cart */
  getCarritosById = async (req, res) => {
    const carrito = await this.carritos.getByIdCarritosService(req.params.id);
    res.json(carrito.productos);
  };

  postById = async (req, res) => {
    const carrito = await this.carritos.getByIdCarritosService(req.params.id);
    const producto = await this.productos.getByIdProductService(req.body.id);
    carrito.productos.push(producto);
    await this.carritos.updateCarritoService(carrito);
    res.end();
  };

  deleteProdById = async (req, res) => {
    const carrito = await this.carritos.getByIdCarritosService(req.params.id);
    const index = carrito.productos.findIndex((p) => p.id == req.params.idProd);
    if (index != -1) {
      carrito.productos.splice(index, 1);
      await his.carritos.updateCarritoService(carrito);
    }
    res.end();
  };
};
