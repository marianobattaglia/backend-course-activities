const router = require("express").Router();
const { getRandomController } = require("../controllers/randomController");
const { getInfoController } = require("../controllers/infoController");

/* ---- Routes ---- */
router.get("/info", getInfoController);
router.get("/randoms", getRandomController);

module.exports = router;
