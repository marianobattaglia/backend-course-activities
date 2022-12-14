const UsersDAOMem = require("./usersDAOMem");
const UsersDAOFile = require("./usersDAOFile");
const { db } = require("../../../config/config");

module.exports = class UsersFactoryDAO {
  static get(type) {
    switch (type) {
      case "MEM":
        return new UsersDAOMem();
      case "FILE":
        return new UsersDAOFile(process.cwd() + "data/users.json");
      default:
        return new UsersDAOMem();
    }
  }
};
