class CarritosDAOMem {
  constructor() {
    this.elementos = [];
  }

  getById(id) {
    const elem = this.elementos.find((elem) => elem.id == id);
    if (!elem) throw new Error(`Get All ERROR: Element not found`);
    return elem;
  }

  getAll() {
    return [...this.elementos];
  }

  save(elem) {
    let newId =
      this.elementos.length == 0
        ? 1
        : this.elementos[this.elementos.length - 1].id + 1;

    const newElem = { ...elem, id: newId };
    this.elementos.push(newElem);
    return newElem;
  }

  update(elem) {
    const index = this.elementos.findIndex((p) => p.id == elem.id);
    if (index == -1) throw new Error(`Update ERROR: Element not found`);
    this.elementos[index] = elem;

    return elem;
  }

  deleteById(id) {
    const index = this.elementos.findIndex((elem) => elem.id == id);
    if (index == -1) throw new Error(`Delete ERROR: Element not found`);
    return this.elementos.splice(index, 1);
  }

  deleteAll() {
    this.elementos = [];
    return true;
  }
  async save(carrito = { productos: [] }) {
    return super.save(carrito);
  }
}

module.exports = CarritosDAOMem;
