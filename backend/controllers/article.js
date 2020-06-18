'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

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
    },  //end testt

    save: (req, res) => {
        //Recoger parametros por post
        var params = req.body;
        console.log(params)

        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);


        } catch (err) {

            return res.status(404).send({
                status: 'Error',
                message: 'Faltan datos en la peticion'
            });
        }

        var article = new Article({
            title: params.title,
            content: params.content,
            image: null
        })

        //Guardar articul0
        article.save((err) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'El articulo no se ha guardado'
                });
            }

            //Devolver respuesta
            return res.status(200).send({
                message: 'El articulo ha sido guardado',
                status: 'Success',
                article: article
            });
        });
    }, // end save

    getArticles: (req, res) => {

        var query = Article.find({});

        //mostrar los ultimos 5 documentos de mongo
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }

        //find
        query.sort('-_id').exec((err, articles) => {    //descendente -_id y ascendente _id

            if (err) {

                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos'
                });
            }

            if (!articles) {

                return res.status(404).send({
                    status: 'error',
                    message: 'no hay articulos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        });

    }, // end getArticles

    getArticle: (req, res) => {

        //recoger el URL ID
        var articleId = req.params.id;

        //comprobar si existe el ID
        if (!articleId || articleId == null) {

            return res.status(404).send({
                status: 'Error',
                message: 'no existe este articulo'
            });
        }

        //Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {

                return res.status(404).send({
                    status: 'Error',
                    message: 'no existe este articulo'
                });

            }

            return res.status(200).send({
                status: 'Success',
                article
            });

        });

    }, //  getArticle

    update: (req, res) => {

        //Obtener el id del articulo por el url
        var articleId = req.params.id;

        //Recoger los datos que lleve el put en el body para actualizar
        var params = req.body;

        //validar que existe el ID
        try {

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);


        } catch (err) {

            return res.status(404).send({
                status: 'Error',
                message: 'Faltan datos en el put'
            });
        }

        //Hacer find y update
        if (validate_title && validate_content) {

            Article.findByIdAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {

                if (err || !articleUpdated) {

                    return res.status(404).send({
                        status: 'Error',
                        message: 'Error al actualizar'
                    });

                }

                return res.status(200).send({
                    status: 'Success',
                    article: articleUpdated
                });

            });    //retorna el objeto ya actializado {new:true}

        } else {
            //respuesta
            return res.status(404).send({
                status: 'Error',
                message: 'no existe este articulo'
            });
        }

    },  // end update

    delete: (req, res) => {
        //tomar el id de la url
        var articleId = req.params.id;

        //metodo find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {

            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Ocurrio un error al eliminar el registro'
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se encontro el registro'
                });
            }

            return res.status(200).send({
                status: 'Success',
                message: 'El documento fue eliminado',
                article: articleRemoved
            });

        });
    },      // end delete

    upload: (req, res) => {
        //configurar el modulo de  connect multiparty router/article.js

        //recoger el fichero de la peticion
        var file_name = 'imagen no subida ...';
        //console.log(req.files);
        /*
        {
            image: {
                fieldName: 'image',
                originalFilename: 'Capture001.png',
                path: 'upload\\articles\\ZqCyVWV86VdK6g_34yhkBtK9.png',
                headers: {
                'content-disposition': 'form-data; name="image"; filename="Capture001.png"',
                'content-type': 'image/png'
                },
                size: 2683588,
                name: 'Capture001.png',
                type: 'image/png'
            }
        }
        */
        //verificar que los datos vengan
        if (!req.files) {
            return res.status(404).send({
                status: 'Error',
                message: 'No existe algun archivo en el request'
            });
        }

        //conseguir el nombre y la extencion
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\'); //ADVERTENCIA el path en linux o mac es separado por / seria asi => file_path.split('/');
        var length_file_split = file_split.length - 1;  //Se busca la ultima posicion de la lista
        var file_name = file_split[length_file_split];
        console.log(file_name)
        var file_name_split = file_name.split('.');
        var extension_file = file_name_split[1];
        console.log(extension_file);

        //comprobar la extension del archivo, solo imagenes, si no es valido borrar el fichero
        if (extension_file != 'png' && extension_file != 'jpg' && extension_file != 'jpeg' && extension_file != 'gif') {
            //borrar archivo cargado
            fs.unlink(file_path, (err) => {
                return res.status(404).send({
                    status: 'Error',
                    message: 'La extension de la imagen no es valida'
                });
            });
        } else {
            // si todo esta bien, buscar el id del article
            var articleId = req.params.id;

            //buscar el articulo, asignarle el nombre de la imagen y actualizarlo
            Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdate) => {

                if (err || !articleUpdate) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No se pudo almacenar el nombre el archivo en la DB'
                    });
                }

                return res.status(200).send({
                    status: 'Success',
                    message: 'Carga del archivo exitosa',
                    article: articleUpdate
                });
            });
        }
    },  //end upload file

    getImage: (req, res) => {
        return res.status(200).send({
            status: 'Success',
            message: 'Se encontro el archivo'
        });
    }   // end getImage

};   //end controller

module.exports = controller;   //para poder usarlo afuera