# Desafío MongoDB

**Consigna**: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.
2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).
3. Listar todos los documentos en cada colección.
4. Mostrar la cantidad de documentos almacenados en cada una de ellas.
5. Realizar un CRUD sobre la colección de productos:
   - a) Agregar un producto más en la colección de productos
   - b) Realizar una consulta por nombre de producto específico:
     - i) Listar los productos con precio menor a 1000 pesos.
     - ii) Listar los productos con precio entre los 1000 a 3000 pesos.
     - iii) Listar los productos con precio mayor a 3000 pesos.
     - iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
   - c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
   - d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
   - e) Borrar los productos con precio menor a 1000 pesos
6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

---

# Resolución

0. Creación de la DB

<pre><code>mongod --dbpath “ruta/hacia/la/carpeta/miBaseMongo”
use ecommerce</pre></code>

1. Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB.

<pre><code>db.createCollection("messages")
db.createCollection("products")</code></pre>

2. Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

<pre><code>db.productos.insert([
    {id: 1, nombre:'iphone 8', precio:300, thumbnail: 'ip8.jpg'},
    {id: 2, nombre:'iphone 8 plus', precio: 345, thumbnail: 'ip8plus.jpg'},
    {id: 3, nombre:'iphone 7', precio:245, thumbnail: 'iphone7.jpg'},
    {id: 4, nombre:'iphone 7 plus', precio:276, thumbnail: 'ip7plus.jpg'},
    {id: 5, nombre:'macbook pro m1', precio:2075, thumbnail: 'macbookprom1.jpg'},
    {id: 6, nombre:'macbook pro m2', precio:3745, thumbnail: 'macbookprom2.jpg'},
    {id: 7, nombre:'iphone 11', precio:510, thumbnail: 'ip11.jpg'},
    {id: 8, nombre:'iphone 12', precio:675, thumbnail: 'ip12.jpg'},
    {id: 9, nombre:'iphone 13', precio:999, thumbnail: 'ip13.jpg'},
    {id: 10, nombre:'iphone 13 pro max', precio:1965, thumbnail: 'ip13promax.jpg'}
])

db.messages.insert([
    {mail:'mariano@gmail.com', mensaje: 'hola'}, 
    {mail:'profecoder@gmail.com', mensaje: 'bienvenidos al curso de backend'}, 
    {mail:'alumnoscoder@gmail.com', mensaje: 'este es el mejor curso'},
    {mail:'random@gmail.com', mensaje: 'esto es un msj random'}, 
    {mail:'mariano@gmail.com', mensaje: 'probando carga de mensajes'}, 
    {mail:'profecoder@gmail.com', mensaje: 'esta es la clase de mongodb'}, 
    {mail:'alumnos@gmail.com', mensaje: 'este es el correo de alumnos'}, 
    {mail:'mariano@gmail.com', mensaje: 'abcd'}, 
    {mail:'profecoder@gmail.com', mensaje: 'aguante boca'}, 
    {mail:'prueba@gmail.com', mensaje: 'probando con un mensaje'}
])</code></pre>

3. Listar todos los documentos en cada colección.

<pre><code>db.products.find()
db.messages.find()</code></pre>

4. Mostrar la cantidad de documentos almacenados en cada una de ellas.

<pre><code>db.products.count()
db.messages.count()</code></pre>

5. Realizar un CRUD sobre la colección de productos:

- a) Agregar un producto más en la colección de productos
<pre><code>db.products.insertOne({title: "iphone 14", price: 1499, thumbnail: "iphone 14"})</code></pre>

- b) Realizar una consulta por nombre de producto específico:

<pre><code>db.products.find({title: "iphone 13"})
</code></pre>

- i) Listar los productos con precio menor a 1000 pesos.

<pre><code>db.products.find({price:{$lt: 1000}})</code></pre>

- ii) Listar los productos con precio entre los 1000 a 3000 pesos.
<pre><code>db.products.find({price: { $gte: 1000, $lte: 3000 }})</code></pre>

- iii) Listar los productos con precio mayor a 3000 pesos.
<pre><code>db.products.find({ price: { $gt: 3000 } })</code></pre>

- iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
<pre><code>db.products.find().sort({precio: 1}).limit(1).skip(2)</code></pre>

- c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
<pre><code>db.products.updateMany({}, { $set: { stock: 100} })</code></pre>

- d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
<pre><code>db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0} })</code></pre>

- e) Borrar los productos con precio menor a 1000 pesos
<pre><code>db.products.deleteMany({ price: { $lt: 1000 } })
</code></pre>

6. Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.
<pre><code>db.createUser({user:"pepe", pwd: "asd456", roles: [{role: "read", db: "eccomerce"}]})

// Login:
mongo -u pepe -p asd456 --authenticationDatabase ecommerce

// Pruebo lectura:
db.products.find()

// Pruebo escritura:
db.products.insertOne({ title: "unauthorized" })
</code></pre>
