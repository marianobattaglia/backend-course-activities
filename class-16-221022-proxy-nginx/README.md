# SERVIDOR CON BALANCE DE CARGA

Retomemos nuestro trabajo para poder ejecutar el servidor en modo fork o cluster, ajustando el balance de carga a través de Nginx.

## EJECUTAR SERVIDORES NODE

### Consigna:

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

## SERVIDOR NGINX

### Consigna:

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.
Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

## Aspectos a incluir en el entregable:

Incluir el archivo de configuración de nginx junto con el proyecto.
Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

Ejemplo:

- pm2 start ./miservidor.js -- --port=8080 --modo=fork
- pm2 start ./miservidor.js -- --port=8081 --modo=cluster
- pm2 start ./miservidor.js -- --port=8082 --modo=fork
- ...

---

# Cómo ejecutar:

1. Instalar todas las dependencias
   `npm i --save`

2. Para correr en modo dev con nodemon:
   `nodemon app.js`

3. Para correr en modo dev con node:
   `node app.js`

## Rutas

| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST | **/login** | Formulario de login. Para almacenar las sesiones se utilizó mongoAtlas. |
| POST | **/logout** | Se puede acceder directamente desde el endpoint o clickeando sobre el botón de "logout". |
| GET | **/productos** | Lista todos los productos almacenados |
| POST | **/productos** | Crea y almacena productos al listado |
| GET | **/productos-test** | Lista 5 productos mock generados con Faker.js |
| GET | **/chat** | Retorna el chat creado con socket. Muestra la data desnormalizada y es almacenada normalizada en un archivo tipo JSON |
| GET | **/info** | Muestra informacion por medio del navegador |
| GET | **/randoms** | Devuelve una cantidad de números aleatorios del 1 al 1000 segun se coloque en la query. Se debe usar de la siguiente manera: `/api/randoms?cant=20000`. En caso de no agregar la cantidad, se calculan 100.000.000 números. |
