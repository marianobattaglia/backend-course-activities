const Contenedor = require("./contenedor.js");

const desafio = async () => {
  let repository = new Contenedor("products.txt");

  /* ## Remove comments to test functions ## */

  //Test: save()
  /*
  const data = await repository.save({
    title: "Product",
    price: 100,
    thumbnail: "https://placeimg.com/640/480/tech",
  });
  console.log(repository.objects);
  */

  //Test: getById()
  /*
  let get = repository.getById(2);
  console.log(get);
  */

  //Test: getAll()
  /*
  let getAll = repository.getAll();
  console.log(getAll);
  */

  //Test: deleteById()
  /*
  let deleteById = repository.deleteById(7);
  */

  //Test: deleteAll()
  /*
  let deleteAll = repository.deleteAll();
  repository.objects;
  */
};

desafio();
