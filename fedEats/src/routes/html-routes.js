const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fedeats"
});

module.exports = function(app) {
  app.get('/', function(req, res) {
    connection.query('SELECT * FROM deli_bases', function(err, data) {
      (err)?res.send(err):res.json({deli_bases: data});
    });
  });
};
