const fs = require("fs");

class Contenedor {
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
      console.log("File is empty");
    }
  }

  //Methods for Read and Write Data:
  //Write/overwrite file
  async write() {
    await fs.promises.writeFile(this.fileName, JSON.stringify(this.content));
  }

  //Save object
  save(object) {
    this.countID++;
    object["id"] = this.countID; //Add property "id" to the object
    this.content.push(object); //Add object to the array
    this.write(); //Add object to file
    return `Product added. ID: ${this.countID}.`; //Return ID
  }

  //Return all objects on Array
  getAll() {
    return this.content;
  }

  //Return the object with the ID parameter. If isnt returns "null"
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

  //Delete object with ID parameter
  deleteById(id) {
    let result;
    if (this.content !== []) {
      let newContent = this.content.filter((x) => x.id !== id);
      this.content = newContent;
      this.write(); //Overwrite file
      result = `Product deleted`;
    } else {
      result = `File is empty`;
    }
    return result;
  }

  //Delete all objects on file
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

module.exports = Contenedor;
