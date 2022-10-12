const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Usuarios = require("./models/usuarios");

const bcrypt = require("bcrypt");

const expbs = require("express-handlebars");
require("dotenv").config({ path: "./config/.env" });
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const path = require("path");
const routes = require("./routers/index");

const mongoose = require("mongoose");

/* --- */

const redis = require("redis");
const client = redis.createClient({
  legacyMode: true,
});
client.connect();
const RedisStore = require("connect-redis")(session);

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

//salto 10 es como el grado de encriptacion, es muy alto 10
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

mongoose
  .connect("mongodb://localhost:27017/testLogin")
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to the db";
  });

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      //con lo siguiente quedas logueado, creas la session
      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, user) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          //con lo siguiente quedas logueado, creas la session
          return done(null, user);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

/* --- */

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

/* ---- Imports ---- */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* ----------------- */

/* ---- Session config ---- */
app.use(
  session({
    /*
    store: MongoStore.create({
      mongoUrl: process.env.MONGOATLAS,
      mongoOptions: adavancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    */
    store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 86400000, // 1 dia
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

/* ---- Middlewares ---- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));
app.use("/", routes);
app.use(passport.initialize());
app.use(passport.session());

/* ---- Motor de plantillas ---- */
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

/* */
app.listen(8000, () => {
  console.log(`Example app listening on port http://localhost:8000`);
});

app.get("/", routes.getRoot);
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFaillogin);
app.get("/signup", routes.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);
app.get("/logout", routes.getLogout);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  res.send("<h1>Ruta ok!</h1>" + JSON.stringify(user));
});

app.get("*", routes.failRoute);

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
  res.status(500).send("Ocurrio un error: " + err);
});

/* ---- Server ---- */
httpServer.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});
