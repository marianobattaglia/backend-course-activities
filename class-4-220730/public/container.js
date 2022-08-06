const e = require("express");
const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  save = async (object) => {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      let products = JSON.parse(data);
      if (products.length > 0) {
        object.id = products[products.length - 1].id + 1;
        products.push(object);
        const productsJson = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.file, productsJson);
        console.log(`New product added: ${object.title}`);
      } else {
        let products = [];
        object.id = 1;
        products.push(object);
        const productsJson = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.file, productsJson);
        console.log(`New product added: ${object.title}`);
      }
    } catch (err) {
      const productsJson = JSON.stringify([], null, 2);
      await fs.promises.writeFile(this.file, productsJson);
    }
  };

  getAll = async () => {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      let products = JSON.parse(data);
      return products;
    } catch (error) {
      console.log("Error. Can't GET products.");
    }
  };

  getById = async (id) => {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      let products = JSON.parse(data);
      let aux = null;
      aux = products.find((element) => element.id == id);

      if (aux == null) {
        console.log("Product not found");
      } else {
        return aux;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  };

  deleteById = async (id) => {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      let products = JSON.parse(data);
      if (products.find((element) => element.id == id)) {
        let aux = products.filter((element) => element.id != id);
        products = aux;
        await fs.promises.writeFile(
          this.file,
          JSON.stringify(products, null, 2)
        );
        await console.log(`Deleted product ID: ${id}`);
      } else {
        console.log("Product ID not found");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  deleteAll = async () => {
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([]));
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  getRandom = async () => {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      let products = await JSON.parse(data);

      let min = 0;
      let max = products.length - 1;
      let randomNum = Math.floor(Math.random() * (max - min + 1));
      console.log(products[randomNum]);
      return products[randomNum];
    } catch (error) {
      console.log(`Error: ${error}`);
      return null;
    }
  };

  update = async (id, obj) => {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      let products = await JSON.parse(data);

      let productosActualizados = products.map((e) =>
        e.id == id ? (e = { ...e, ...obj }) : e
      );

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(productosActualizados, null, 2)
      );
      console.log("Update Complete");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = Contenedor;
