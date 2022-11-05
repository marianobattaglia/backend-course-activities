/* Imports */
const express = require("express");
const session = require("express-session");
const expbs = require("express-handlebars");
require("dotenv").config({ path: "./config/.env" });
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const path = require("path");
const routes = require("./routers/index");
// GZIP
const compression = require("compression");
// Winston
const { logger } = require("./utils/loggers");

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
app.use(compression());
app.use((req, res, next) => {
  logger.info({ URL: req.originalUrl, method: req.method });
  next();
});

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

app.all("*", (req, res) => {
  logger.warn({ URL: req.originalUrl, method: req.method });
  res.status(404).send("Ruta no encontrada");
});

/* ---- Server ---- */
httpServer.listen(process.env.PORT || 8080, () => {
  console.log(`SERVER ON - Listening on port ${process.env.PORT || 8080}`);
});

// Artillery -> iniciar servidor con 'node app.js 8081 FORK'
/*
const cluster = require("cluster");
const os = require("os");
const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == "CLUSTER";

if (modoCluster && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Número de procesadores: ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(
      "Worker",
      worker.process.pid,
      "died",
      new Date().toLocaleString()
    );
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/", (req, res) => {
    const primes = [];
    const max = Number(req.query.max) || 1000;
    for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primes.push(i);
    }
    res.json(primes);
  });

  app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
    console.log(`PID WORKER ${process.pid}`);
  });
}

function isPrime(num) {
  if ([2, 3].includes(num)) return true;
  else if ([2, 3].some((n) => num % n == 0)) return false;
  else {
    let i = 5,
      w = 2;
    while (i ** 2 <= num) {
      if (num % i == 0) return false;
      i += w;
      w = 6 - w;
    }
  }
  return true;
}
*/
