const CarritosDAOMem = require("./carritosDAOMem");
const CarritosDAOFile = require("./carritosDAOFile");
const CarritosDAOMongo = require("./carritosDAOMongo");
const { db } = require("../../../config/config");

module.exports = class CarritosFactoryDAO {
  static get(type) {
    switch (type) {
      case "MEM":
        return new CarritosDAOMem();
      case "FILE":
        return new CarritosDAOFile(process.cwd() + "data/carritos.json");
      case "MONGO":
        return new CarritosDAOMongo(db.name, db.collection);
      default:
        return new CarritosDAOMem();
    }
  }
};
