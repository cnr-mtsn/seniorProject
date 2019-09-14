import { createConnection } from 'mysql';

var con = createConnection({
  host: "localhost",
  user: "root",
  password: "Cs07193."
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});