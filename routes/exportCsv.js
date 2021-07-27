var express = require('express');
var router = express.Router();
var exportCSV = require('../exportCSV');
var path = require('path');

/* GET home page. */
router.get('/export', async function(req, res, next) {
  var { standard } = req.query;
  var pdir = path.resolve(__dirname, '..');
  var file = path.join(pdir, `public/exports/${Date.now()}.csv`);
  exportCSV('../database.db', file, 'attendance').then(() => {
      res.download(file, path.basename(file));
  }).catch(e => {
      res.status(500).json(e);
  });
});

module.exports = router;
