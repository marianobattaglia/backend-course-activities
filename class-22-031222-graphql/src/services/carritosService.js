const path = require("path");
const CarritosFactoryDAO = require("../model/DAOs/carritos/carritosFactory");

module.exports = class CarritosService {
  constructor() {
    this.carritos = new CarritosFactoryDAO();
  }

  getCarritosService = () => this.carritos.getAll();

  getByIdCarritosService = (id) => {
    this.carritos.getById(id);
  };

  thereAreCarritosService = () => this.carritos.content.length !== 0;

  saveCarritoService = (obj) => {
    this.carritos.save(obj);
  };

  deleteByIdCarritoService = (id) => {
    this.carritos.deleteById(id);
  };

  deleteAllCarritoService = () => this.carritos.deleteAll();

  updateCarritoService = (id, obj) => {
    this.carritos.update(id, obj);
  };
};
