const UsersService = require("../services/usersService");

module.exports = class SessionController {
  constructor() {
    this.users = new UsersService();
  }

  getLogin = (req, res) => {
    return res.render("login.hbs");
  };

  postLogin = (req, res) => {
    let name = req.body.name;
    req.session.user = name;
    return res.redirect("productos");
  };

  getLogout = (req, res) => {
    req.session.destroy((err) => {
      if (!err) {
        res.render("bye_banner.hbs");
      } else res.send({ status: "Logout ERROR", body: err });
    });
  };

  getRegister = (req, res) => {
    return res.render("register.hbs");
  };

  postRegister = (req, res) => {
    this.users.save(req.body);
    let user = req.body.username;
    req.session.user = user;
    return res.redirect("login");
  };

  getLoginError = (req, res) => {
    return res.render("error-login.hbs", { name: "logearse", path: "login" });
  };

  getRegisterError = (req, res) => {
    return res.render("error-register.hbs", {
      name: "registrarse",
      path: "register",
    });
  };
};
