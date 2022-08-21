// Socket creation and connect to Server
const socket = io();

// ---- Client side Configuration ----
// This will catch messages sent on Server.
socket.on('connect', () => {
  console.log('Connected to Server'); /* Logs in the Front */
});

// ---- CHAT SERVICE ----
// Function to sending chat
function sendChat() {
  //Inputs
  const email = document.getElementById('emailInput').value;
  const mensaje = document.getElementById('messageInput').value;

  //Date Confg.
  var date = new Date(),
    dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  // Text fields and send message validation
  if (email.includes('@' && '.com')) {
    socket.emit('data-chat', `<span style="color:blue">${email}</span> <span style="color:red">[${dateFormat}]</span>: <span style="color:green">${mensaje}</span>`);
  } else {
    alert('You must enter a valid email format, for example: your_name@mail_provider.com');
  }
  // Clean message text field
  document.getElementById('messageInput').value = '';
}

// Chat array receptor
socket.on('arr-chat', (data) => {
  //Send chats to div 'html' using reduce
  const html = data.reduce((html, item) => `<div>${item}</div>` + html, '');
  document.getElementById('div-chats').innerHTML = html;
});

// ---- FORM: NEW PRODUCT ----
// Function to submit the form with the product data
function submitForm(e) {
  //Cancel propagation
  e.preventDefault();
  //Get body from HTML
  const body = document.getElementById('formNewProduct');

  //Instance of the New Product
  let newProduct = {
    id: body.id.value,
    title: body.title.value,
    price: body.price.value,
    thumbnail: body.thumbnail.value,
  };

  //Emit the new product
  socket.emit('new-product', newProduct);
  //Reset body
  body.reset();

  return false;
}

//New Product Receptor
socket.on('newProducts', (data) => {
  //Get Product Table 'ID' from HTML
  document.getElementById('productsTable').innerHTML = '';
  //Instance New Table
  let newProductsTable = '';
  //Iteration to add product to the New Table
  data.forEach((obj) => {
    newProductsTable += `
          <tr>
          <th scope="row">
                  ${obj.id}
          </th>
          <td style="text-transform: uppercase;">
                  ${obj.title}
          </td>
          <td> ${obj.price}
          </td>
          <td><img src="${obj.thumbnail}" class="product-img" alt="..." /></td>
      </tr>`;
  });
  //Send HTML
  document.getElementById('productsTable').innerHTML = newProductsTable;
});
