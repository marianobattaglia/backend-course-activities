const router = require("express").Router();
const {
  passportAuthLogin,
  passportAuthRegister,
} = require("../middlewares/passport");
const SessionController = require("../controllers/sessionController");

module.exports = class SessionRouter {
  constructor() {
    this.sessionController = new SessionController();
  }
  start() {
    router.get("/login", this.sessionController.getLogin());
    router.post("/login", passportAuthLogin, this.sessionController.postLogin);
    router.get("/logout", this.sessionController.getLogout());
    router.get("/register", this.sessionController.getRegister());
    router.post(
      "/register",
      passportAuthRegister,
      this.sessionController.postRegister()
    );
    router.get("/login-error", this.sessionController.getLoginError());
    router.get("/register-error", this.sessionController.getRegisterError());
  }
};
