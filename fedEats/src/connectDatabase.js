import { createConnection } from 'mysql';

console.log("HI YA!");
var con = createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});