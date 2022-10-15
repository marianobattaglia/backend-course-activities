const { Router } = require("express");
const router = Router();

const productsRouter = require("./productsRouter");
const chatRouter = require("./chatRouter");
const fakerRouter = require("./fakerRouter");
const sessionRouter = require("./sessionRouter");
const infoRouter = require("./infoRouter");

router.use("/productos", productsRouter);
router.use("/chat", chatRouter);
router.use("/", fakerRouter);
router.use("/", sessionRouter);
router.use("/", infoRouter);

module.exports = router;
