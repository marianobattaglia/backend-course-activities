# LOG-IN POR FORMULARIO

## Consigna:

Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.

Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.

Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.

Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.

## Ejemplos:

Se adjuntan tres screenshoot con las vistas anteriormente mencionadas.

Ejemplo 1: https://docs.google.com/presentation/d/1MxjNfHFuy1s4ki4FSS6JdTgZSzJSX9Ng7vGV0f-iCe8/edit#slide=id.gee5ca30b83_0_0

Ejemplo 2: https://docs.google.com/presentation/d/1MxjNfHFuy1s4ki4FSS6JdTgZSzJSX9Ng7vGV0f-iCe8/edit#slide=id.gee5ca30b83_0_5

## Detalles del entregable:

La solución entregada deberá persistir las sesiones de usuario en Mongo Atlas.

- Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.
- Mediante el cliente web de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.
- Borrar una sesión de cliente en la base y comprobar que en el próximo request al usuario se le presente la vista de login.
- Fijar un tiempo de expiración de sesión de 10 minutos recargable con cada visita del cliente al sitio y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.

## Rutas

| Método | Endpoint            | Descripción                                                                                                           |
| ------ | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| POST   | **/login**          | Formulario de login. Para almacenar las sesiones se utilizó mongoAtlas.                                               |
| POST   | **/logout**         | Se puede acceder directamente desde el endpoint o clickeando sobre el botón de "logout".                              |
| GET    | **/productos**      | Lista todos los productos almacenados                                                                                 |
| POST   | **/productos**      | Crea y almacena productos al listado                                                                                  |
| GET    | **/productos-test** | Lista 5 productos mock generados con **Faker.js**                                                                     |
| GET    | **/chat**           | Retorna el chat creado con socket. Muestra la data desnormalizada y es almacenada normalizada en un archivo tipo JSON |