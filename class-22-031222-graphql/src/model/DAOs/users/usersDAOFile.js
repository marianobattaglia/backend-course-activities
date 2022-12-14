const fs = require("fs");

class UsersDAOFile {
  constructor(name) {
    this.fileName = name;
    this.countID = 0;
    this.content = [];
    this.init();
  }

  async init() {
    try {
      let data = await fs.promises.readFile(this.fileName);
      this.content = JSON.parse(data);
      for (const element of this.content) {
        if (element.id > this.countID) this.countID = element.id;
      }
    } catch (error) {
      console.log("There is not file");
    }
  }

  async write() {
    await fs.promises.writeFile(this.fileName, JSON.stringify(this.content));
  }

  save(object) {
    this.countID++;
    object["id"] = this.countID;
    this.content.push(object);
    this.write();
    return `Object saved. ID: ${this.countID}.`;
  }

  getAll() {
    return this.content;
  }

  getById(id) {
    let result;
    if (this.content !== []) {
      result = this.content.find((x) => x.id === id);
      if (result === undefined) {
        result = null;
      }
    } else {
      result = "File is empty";
    }
    return result;
  }

  getByUser(username) {
    let result;
    if (this.content !== []) {
      result = this.content.findIndex((x) => x.username === username);
      if (result === -1) {
        result = null;
      }
    } else {
      result = "File is empty";
    }
    return result;
  }

  deleteById(id) {
    let result;
    if (this.content !== []) {
      let newContent = this.content.filter((x) => x.id !== id);
      this.content = newContent;
      this.write();
      result = `Product Deleted`;
    } else {
      result = `File is empty`;
    }
    return result;
  }

  async deleteAll() {
    this.content = await this.content.splice(0, this.content.length);
    this.write();
  }

  update(id, obj) {
    const index = this.content.findIndex((objT) => objT.id == id);
    obj.id = this[index].id;
    this.content[index] = obj;
    return obj;
  }
}

module.exports = UsersDAOFile;
