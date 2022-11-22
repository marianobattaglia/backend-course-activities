require("dotenv").config({ path: "./config/.env" });

/* ---- MongoAtlas: for data persistance ---- */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/* ---- Session config---- */
const options = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGOATLAS,
    mongoOptions: adavancedOptions,
  }),
  secret: "secreto",
  resave: false,
  saveUninitialized: false,
};

module.exports = { options };
