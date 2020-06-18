'use strict'  /*activacion del modo estricto */

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;  /*sirve para que toda la comunicacion con mongodb sea por medio de promesas */
mongoose.set('useFindAndModify', false) /*sirve para usaar lo mas actual en la comunicacion de mongodb, metodos nuevos */
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useUnifiedTopology: true })
    .then(() => {
        console.log('¡¡Conexion a la base de datos se ha realizado exitosamente!!');

        //crear servidor y escuchar peticiones
        app.listen(port, () => {
            console.log('servidor escuchando en http://localhost:' + port);
        });
    })