const router = require("express").Router();
const InfoController = require("../controllers/infoController");

module.exports = class info1Router {
  constructor() {
    this.infoController = new InfoController();
  }
  start() {
    router.get("/info", this.infoController.getInfo());
  }
};
