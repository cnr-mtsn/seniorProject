const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//show that server is running
app.listen(port, () => console.log(`Listening on port ${port}`));

//create GET route
app.get('/expressBackend', (req, res) => {
  res.send( {
    express: 'EXPRESS/REACT'
  });
});
