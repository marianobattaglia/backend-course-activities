# Desafio 4 - API RESTful

## Consigna:

Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:

- GET '/api/productos' -> devuelve todos los productos.
- GET '/api/productos/:id' -> devuelve un producto según su id.
- POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
- PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
- DELETE '/api/productos/:id' -> elimina un producto según su id.

## Aspectos a incluir:

- Cada producto estará representado por un objeto con el siguiente formato:
  {
  title: (nombre del producto),
  price: (precio),
  thumbnail: ‘http:/public/gatito.jpg’
  }
- Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.
- Para el caso de que un producto no exista, se devolverá el objeto:
  { error : 'producto no encontrado' }
- Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria. (FILESYSTEM o NO: OPCIONAL)
- Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
- Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
- El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
- Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

---

## Ejecutar aplicación:

1. Instalar dependencias

### `npm install`

2. Ubicarse en la carpeta "class-3-220723" dentro del terminal

### `cd class-3-220723/`

3. Iniciar servidor desde nodemon

### `nodemon server.js`
