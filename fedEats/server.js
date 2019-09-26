const express = require('express');
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 5000;
const query = "SELECT * FROM test";


const connection = mysql.createConnection({
  host: "https://www.math-cs.ucmo.edu/phpmyadmin/",
  user: "F19fedres2",
  password: "F19pw$",
  database: "F19fedres2"
});

connection.connect(function(err) {});

//show that server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

function runQuery(query) {
  app.get('/expressBackend', (req, res) => {
    connection.query(query, function(err, data) {
      console.log(data);
      return data;
    });
  });
};
//console.log(runQuery(query))

//create GET route
app.get('/getDate', (req, res) => {
  res.send( {
    express: new Date()
  });
});

