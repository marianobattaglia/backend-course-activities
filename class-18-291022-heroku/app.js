/* Imports */
const express = require("express");
const session = require("express-session");
const expbs = require("express-handlebars");
require("dotenv").config({ path: "./config/.env" });
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const path = require("path");
const routes = require("./routers/index");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ---- MongoAtlas: for data persistance ---- */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/* ---- Session config---- */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOATLAS,
      mongoOptions: adavancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

/* ---- Middlewares ---- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));
app.use("/", routes);

/* ---- Handlebars (como motor de plantillas) ---- */
app.engine(
  "hbs",
  expbs.engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

/* ---- Chat ---- */
const ApiChat = require("./api/apiChat");
const apiChat = new ApiChat();
let messages = [];

io.on("connection", async (socket) => {
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length + 1;
    messages.push(data);

    io.sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });
});

/* ---- Error handler ---- */
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Error: " + err);
});

/* ---- Server ---- */
httpServer.listen(process.env.PORT || 8080, () => {
  console.log(`SERVER ON - Listening on port ${process.env.PORT || 8080}`);
});
