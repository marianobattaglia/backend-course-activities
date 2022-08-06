document.getElementById("searchId").addEventListener("click", getById);

function getById(e) {
  e.preventDefault();
  const id = document.getElementById("id").value;

  fetch("./productos.txt")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let product = data.find((element) => element.id == id);
      console.log(product);
      document.getElementById("productTitle").value = product.title;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productThumbnail").value = product.thumbnail;
    });
}
