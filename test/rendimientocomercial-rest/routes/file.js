const express = require('express');
var fs = require('fs');
var appEnv = require('../environments/environment');

const router = express.Router();

router.get('/:filename', function (req, res, next) {
    var filename = req.params.filename;
    try {
        res.status(200).send(fs.readFileSync(appEnv.assets_dir + filename));
    } catch (error) {
        res.status(404).send(JSON.stringify({ message: 'not found' }));
    }
});

module.exports = router;
