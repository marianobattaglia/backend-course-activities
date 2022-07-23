const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
    this.objects = this.readData(this.file) || []; //if "file" has no data initializes as an empty array
  }

  //Methods for Read and Write Data:
  //Write/overwrite file
  writeData(objects) {
    fs.writeFileSync(this.file, JSON.stringify(objects, null, 2));
  }
  //Read data file
  readData(path) {
    const data = JSON.parse(fs.readFileSync(path, "utf-8"));
    return data;
  }

  //Return an array with each elements in file
  async getAll() {
    try {
      const data = await this.readData(this.file);
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //Generate ID
  async generateId() {
    try {
      this.objects = (await this.getAll()) || [];
      let lastId = this.objects.length;
      this.objects.forEach((elem) => {
        elem.id > lastId ? (lastId = elem.id) : lastId;
      });
      return lastId++;
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //Save object
  async save(object) {
    try {
      const loadFile = await this.getAll();
      if (!loadFile) {
        object.id = await this.generateId();
        this.objects.push(object);
        this.writeData(this.objects);
        return object.id;
      }
      this.objects = loadFile;
      object.id = await this.generateId();
      this.objects.push(object);
      this.writeData(this.objects);
      return object.id;
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //Get element by ID, or null if there is empty
  async getById(id) {
    try {
      this.objects = await this.getAll();
      const object = this.objects.find((elem) => elem.id === Number(id));
      const result = object ? object : null;
      console.log(result);
      return result;
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //Delete element by ID number
  async deleteById(id) {
    try {
      this.objects = await this.getAll();
      this.objects = this.objects.filter((elem) => elem.id != Number(id));
      this.writeData(this.objects);
      console.log(`ID ${id} was deleted from repository`);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //Delete all repository
  async deleteAll() {
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
    } catch (err) {
      console.log("Error: " + error);
    }
  }
}

module.exports = Contenedor;
