'use strict'

//cargar modulos de Node JS, para cargar el servidor

var express = require('express');      //cargar libreria de express
var bodyParser = require('body-parser');

//Ejecutar Express http
var app = express();

//Cargar Ficheros de rutas
var article_routes = require('./routes/article');

//MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));   // urlencoded sirve para leer la ruta, extended: cargar el body parser
app.use(bodyParser.json());    // transforma las peticiones http a json

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//Añadir Prefijos a rutasb / cargar ruta (super necesario)
app.use('/api', article_routes);

//Ruta de PRUEBA PARA EL API REST - Ejemplo
/*
app.get('/probando', function (req, res) {
    console.log('Prueba de metodo GET en la API REST');

    return res.status(200).send({
        Curso: 'Master en FrameWork JS',
        Alumno: 'Walter Recinos'
    });
});
*/

//Exportar Modulo (fichero actual)
module.exports = app;  // permite cargar los modulos de APP