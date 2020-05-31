'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

//Rutas de pruebas
router.get('/test-de-controlador', ArticleController.test);
router.post('/datos-cursos', ArticleController.datosCurso);

//Rutas utiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);   //  "/:last?" = esto se refiere a parametro opcional, por que sino viene solo es /articles

module.exports = router;