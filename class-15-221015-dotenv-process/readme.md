### Agregar Dotenv + Usando el objeto process

## Agregar Dotenv

### Consigna 1

- Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo **.env**, y cargarlo mediante la librería **dotenv**.
- La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.
- Observación: por el momento se puede dejar la elección de sesión y de persistencia explicitada en el código mismo. Más adelante haremos también parametrizable esta configuración.

### Consigna 2

- Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:
  - Argumentos de entrada
  - Path de ejecución
  - Nombre de la plataforma (sistema operativo)
  - Process id
  - Versión de node.js
  - Carpeta del proyecto
  - Memoria total reservada (rss)

## Usando el objeto process

### Consigna

- Agregar otra ruta '/api/randoms' que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query). Por ej: /randoms?cant=20000.
- Si dicho parámetro no se ingresa, calcular 100.000.000 números.
- El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.
- Observación: utilizar routers y apis separadas para esta funcionalidad.

## Rutas

| Método | Endpoint            | Descripción                                                                                                                                                                                                                 |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | **/login**          | Formulario de login. Para almacenar las sesiones se utilizó mongoAtlas.                                                                                                                                                     |
| POST   | **/logout**         | Se puede acceder directamente desde el endpoint o clickeando sobre el botón de "logout".                                                                                                                                    |
| GET    | **/productos**      | Lista todos los productos almacenados                                                                                                                                                                                       |
| POST   | **/productos**      | Crea y almacena productos al listado                                                                                                                                                                                        |
| GET    | **/productos-test** | Lista 5 productos mock generados con Faker.js                                                                                                                                                                               |
| GET    | **/chat**           | Retorna el chat creado con socket. Muestra la data desnormalizada y es almacenada normalizada en un archivo tipo JSON                                                                                                       |
| GET    | **/info**           | Muestra informacion por medio del navegador                                                                                                                                                                                 |
| GET    | **/randoms**        | Devuelve una cantidad de números aleatorios del 1 al 1000 segun se coloque en la query. Se debe usar de la siguiente manera: `/api/randoms?cant=20000`. En caso de no agregar la cantidad, se calculan 100.000.000 números. |
