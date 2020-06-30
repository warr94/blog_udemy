'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/articles' });

//Rutas de pruebas
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-cursos', ArticleController.datosCurso);

//Rutas utiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);   //  "/:last?" = esto se refiere a parametro opcional, por que sino viene solo es /articles
router.get('/article/:id', ArticleController.getArticle); // :id, quiere decir que es un elemento de la url obligatorio
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);


module.exports = router;