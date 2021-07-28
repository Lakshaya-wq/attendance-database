var express = require('express');
var router = express.Router();
var exportCSV = require('../exportCSV');
var path = require('path');
var stream = require('stream');

router.post('/export', function(req, res, next) {
  var { standard } = req.body;
  
  // export the database table 'attendance' where there are only children of the current class
  exportCSV('db.sqlite3', 'attendance', standard).then((data) => {
    var contents = Buffer.from(data);
    var readStream = new stream.PassThrough();
    readStream.end(contents);
    // tell the browser we're send a csv response
    res.set('Content-Type', 'text/csv');
    // make the browser download the file instead of reading it
    res.set('Content-disposition', 'attachment; filename=' + `${Date.now()}.csv`);
    // send the csv response
    readStream.pipe(res);
  }).catch(e => {
    // an error occurred, send a 500 with the error body
    res.status(500).send(e);
  });
})

module.exports = router;
