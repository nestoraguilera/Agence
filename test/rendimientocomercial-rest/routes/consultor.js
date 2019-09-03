const express = require('express');
const router = express.Router();
var consultor = require('../data/consultor');

router.get('/', function (req, res, next) {
  consultor.ConsultorList()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.log("EXCEPTION: (consultor.js:get:'/':" + error);
      res.status(200).json([]);
    });
});

router.get('/informe01_multi/:dateF/:dateT/:ids', function (req, res, next) {
  var ids = req.params.ids.split(',');
  consultor.Informe01_multi(req.params.dateF, req.params.dateT, ids)
    .then((results) => res.status(200).json(results));
});

router.get('/Informe01_multi_XMLforGraph/:dateF/:dateT/:ids', function (req, res, next) {
  var ids = req.params.ids.split(',');
  consultor.Informe01_multi_XMLforGraph(req.params.dateF, req.params.dateT, ids)
    .then((results) => res.status(200).send(results));
});

module.exports = router;
