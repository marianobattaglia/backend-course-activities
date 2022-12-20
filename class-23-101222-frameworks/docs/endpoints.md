## Rutas

| Método | Ruta           | Descripción                                                                                                           |
| ------ | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| POST   | **/login**     | Formulario de login. Para almacenar las sesiones se utilizó mongoAtlas.                                               |
| POST   | **/logout**    | Se puede acceder directamente desde el endpoint o clickeando sobre el botón de "logout".                              |
| GET    | **/productos** | Lista todos los productos almacenados                                                                                 |
| POST   | **/productos** | Crea y almacena productos al listado                                                                                  |
| GET    | **/chat**      | Retorna el chat creado con socket. Muestra la data desnormalizada y es almacenada normalizada en un archivo tipo JSON |
| GET    | **/info**      | Muestra informacion por medio del navegador                                                                           |
