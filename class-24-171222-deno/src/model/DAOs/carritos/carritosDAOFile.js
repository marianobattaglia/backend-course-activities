const fs = require("fs");
const config = require("../../../config/config");

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getById(id) {
    const objs = await this.getAll();
    const buscado = objs.find((o) => o.id == id);
    return buscado;
  }

  async getAll() {
    try {
      const objs = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return [];
    }
  }

  async save(obj) {
    const objs = await this.getAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { ...obj, id: newId };
    objs.push(newObj);

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      return newObj;
    } catch (error) {
      throw new Error(`Save ERROR: ${error}`);
    }
  }

  async update(elem) {
    const objs = await this.getAll();
    const index = objs.findIndex((o) => o.id == elem.id);
    if (index == -1) {
      throw new Error(`Update ERROR: not found ID ${id}`);
    } else {
      objs[index] = elem;
      try {
        await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
      } catch (error) {
        throw new Error(`Update ERROR: ${error}`);
      }
    }
  }

  async deleteById(id) {
    const objs = await this.getAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      throw new Error(`Delete ERROR: not found ID ${id}`);
    }

    objs.splice(index, 1);
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error(`Delete ERROR: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Delete All ERROR: ${error}`);
    }
  }
}

class CarritosDAOFile extends ContenedorArchivo {
  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

module.exports = CarritosDAOFile;
