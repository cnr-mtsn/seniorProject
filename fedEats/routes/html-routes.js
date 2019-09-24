const mysql = require('mysql');

const connection = require('../server');

// run query
function getMain(query) {
  module.exports = function(app) {
    app.get('/', function(req, res) {
      connection.query(query, function(err, data) {});
    });
  };
};