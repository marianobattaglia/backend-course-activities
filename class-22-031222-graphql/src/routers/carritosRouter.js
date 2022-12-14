const router = require("express").Router();
const CarritosController = require("../controllers/carritosController");

module.exports = class CarritosRouter {
  constructor() {
    this.carritosController = new CarritosController();
  }
  start() {
    router.get("/", this.carritosController.getCarritos());

    router.get("/:id/productos", this.carritosController.getCarritosById());

    router.post("/", this.carritosController.postCarritos());

    router.post("/:id/productos", this.carritosController.postById());

    router.delete("/:id", this.carritosController.deleteByIdCarritos());

    router.delete(
      "/:id/productos/:idProd",
      this.carritosController.deleteByIdProd()
    );
  }
};
