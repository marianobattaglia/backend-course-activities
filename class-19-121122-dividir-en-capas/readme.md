# Desafio 14 - DIVIDIR EN CAPAS NUESTRO PROYECTO

## Consigna

- Dividir en capas el proyecto entregable con el que venimos trabajando (entregable clase 16: loggers y profilers), agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.
- Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.
- La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.

## Rutas

| Método | Ruta | Descripción |
|------|------|------|
| POST | **/login** | Formulario de login. Para almacenar las sesiones se utilizó mongoAtlas. |
| POST | **/logout** | Se puede acceder directamente desde el endpoint o clickeando sobre el botón de "logout". |
| GET | **/productos** | Lista todos los productos almacenados |
| POST | **/productos** | Crea y almacena productos al listado |
| GET | **/productos-test** | Lista 5 productos mock generados con Faker.js |
| GET | **/chat** | Retorna el chat creado con socket. Muestra la data desnormalizada y es almacenada normalizada en un archivo tipo JSON |
| GET | **/info** | Muestra informacion por medio del navegador |
| GET | **/randoms** | Devuelve una cantidad de números aleatorios del 1 al 1000 segun se coloque en la query. Se debe usar de la siguiente manera: `/api/randoms?cant=20000`. En caso de no agregar la cantidad, se calculan 100.000.000 números. |