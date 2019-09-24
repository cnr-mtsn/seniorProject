const express = require("express");
const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

const app = express()

// create connection
const connection = mysql.createConnection({
  host: "http://localhost:8080",
  user: "cnr.mtsn",
  password: "d83f4eame4cumd",
  database: "users"
});

module.exports = connection;

// connect
connection.connect(function(err){
  (err)? console.log(err): console.log(connection);
});

require('./routes/html-routes')(app);
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
