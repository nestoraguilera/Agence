const express = require('express');
const router = express.Router();
var chart = require('../data/chart');
var appEnv = require('../environments/environment');

router.get('/:dateF/:dateT/:ids', (req, res, next) => {
    var theHtml =
        "<html><head></head><body>"
        + "<embed src='"+appEnv.url_prefixu+"file/FC_2_3_MSColumnLine_DY_2D.swf'"
        + " FlashVars='&dataURL=/file/FC_2_3_MSColumnLine_DY_2D.xml&amp;chartWidth=600&amp;chartHeight=350'"
        + " quality='high' bgcolor='#FFFFFF' WIDTH='600' HEIGHT='350'"
        + ">"
        + "</embed></body></html>";
    res.status(200).send(theHtml);
});

router.get('/bar_inf01/:dateF/:dateT/:ids', function (req, res, next) {
    var ids = req.params.ids.split(',');
    chart.bar_inf01(req.params.dateF, req.params.dateT, ids)
        .then((results) => res.status(200).send(results));
});

router.get('/pie_inf01/:dateF/:dateT/:ids', function (req, res, next) {
    var ids = req.params.ids.split(',');
    chart.pie_inf01(req.params.dateF, req.params.dateT, ids)
        .then((results) => res.status(200).send(results));
});

module.exports = router;
