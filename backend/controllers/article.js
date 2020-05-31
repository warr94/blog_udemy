'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {

        return res.status(200).send({
            Curso: 'Master en FrameWork JS',
            Alumno: 'Walter Recinos',
            status: 'Error'
        });
    },

    test: (req, res) => {

        return res.status(200).send({
            message: 'soy la accion del controller de articulos',
            status: 'Error'
        });
    },  //end test

    save: (req, res) => {
        //Recoger parametros por post
        var params = req.body;
        console.log(params)

        //Validar datos con libreria de validator, esta libreria tiene muchas validaciones verificar en la web
        try {

            var validator_title = !validator.isEmpty(params.title);
            var validator_content = !validator.isEmpty(params.content);

        } catch (err) {
            return res.status(200).send({
                message: 'faltan datos en el envio',
                status: 'error'
            });
        }

        if (validator_title && validator_content) {
            //Crer el objeto a guardar
            var article = new Article();

            //Asigar valores
            article.title = params.title;
            article.content = params.content;
            //article.date = es automatico en el modelo de article
            article.image = null;

            //Guardar articulo
            article.save((err, articleStored) => {

                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                //Devolver respuesta
                return res.status(200).send({
                    message: 'El articulo ha sido guardado',
                    status: 'Success',
                    article: articleStored
                });
            });

            //devolver respusta
            return res.status(200).send({
                status: 'success',
                article
            });
        } else {

            return res.status(200).send({
                message: 'los datos no son validos',
                status: 'success'
            });
        }


    }, // end save

    getArticles: (req, res) => {

        var query = Article.find({});
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(1);
        };
        //find
        query.sort('-_id').exec((err, articles) => {  //sort ordena datos: si pongo "_id" = asendente ( a - z) ; "-_id" = desendente (z - a)

            try {

                return res.status(200).send({
                    message: "lectura de los articulos completa",
                    status: 'Success',
                    articles
                });
            } catch (err) {

                return res.status(404).send({
                    message: "Error al devolver los articulos",
                    status: 'Error'
                });
            };
        });

    }   //end get

};   //end controller

module.exports = controller;   //para poder usarlo afuera