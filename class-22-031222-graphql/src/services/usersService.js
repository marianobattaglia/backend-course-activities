const path = require("path");
const UsersFactoryDAO = require("../model/DAOs/users/usersFactory");

module.exports = class UsersService {
  constructor() {
    this.users = new UsersFactoryDAO();
  }

  getUsersService = () => this.users.getAll();

  getByIdUsersService = (id) => {
    this.users.getById(id);
  };

  thereAreUsersService = () => this.users.content.length !== 0;

  saveUsersService = (obj) => {
    this.users.save(obj);
  };

  deleteByIdUsersService = (id) => {
    this.users.deleteById(id);
  };

  deleteAllUsersService = () => this.users.deleteAll();

  updateUsersService = (id, obj) => {
    this.users.update(id, obj);
  };

  getByUsersService = (username) => {
    this.users.getByUser(username);
  };
};
