const express = require('express');
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 5000;
const query = "SELECT * FROM condiments";


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PASSWORD HERE",
  database: "fedeats"
});

connection.connect(function(err) {});

//show that server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

function runQuery(query) {
  app.get('/expressBackend', (req, res) => {
    connection.query(query, function(err, data) {
      return data;
    });
  });
};

//create GET route
app.get('/getDate', (req, res) => {
  res.send( {
    express: new Date()
  });
});

