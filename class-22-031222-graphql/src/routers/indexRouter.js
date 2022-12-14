const { Router } = require("express");
const router = Router();

const SessionRouter = require("./sessionRouter");
const ProductsRouter = require("./productsRouter");
const ChatRouter = require("./chatRouter");
const InfoRouter = require("./infoRouter");
const CarritosRouter = require("./carritosRouter");

module.exports = class Router {
  constructor() {
    this.sessionRouter = new SessionRouter();
    this.productsRouter = new ProductsRouter();
    this.chatRouter = new ChatRouter();
    this.infoRouter = new InfoRouter();
    this.carritosRouter = new CarritosRouter();
  }
  start() {
    router.use("/", this.sessionRouter.start());
    router.use("/productos", this.productsRouter.start());
    router.use("/chat", this.chatRouter.start());
    router.use("/", this.infoRouter.start());
    router.use("/carritos", this.carritosRouter.start());
  }
};
