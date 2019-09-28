const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 5000;
const app = express();
app.use(cors());
const host = 'www.math-cs.ucmo.edu';
const user = 'F19fedres2';

//DATABASE CONNECTION
const db = mysql.createConnection( {
    host: host,
    user: user, 
    password: 'F19pw$', 
    database: 'F19fedres2'
});

db.connect((err) => {
    if(err) {
        console.log("ERROR: " + err);
    } else {
        console.log(`Connected to MySQL: { host: ${host}, user: ${user} }`);
    }
})


//QUERIES
const SELECT_ALL_CHEESES = 'SELECT * FROM cheese';



//GET ROUTES

//Home Route
app.get('/', (req, res) => {
    res.send(`Go to /cheeses to see cheeses`);
});

//Add Cheese
app.get('/cheeses/add', (req, res) => {
    const {cheese_id, name, price} = req.query;
    const ADD_CHEESE = `INSERT INTO cheese(cheese_id, name, price) VALUES(${cheese_id}, '${name}', ${price})`;
    db.query(ADD_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added Cheese    ID: ${cheese_id} Name: ${name} Price: ${price}`);
        }
    });
});

//Delete Cheese
app.get('/cheeses/delete', (req, res) => {
    const {cheese_id} = req.query;
    const REMOVE_CHEESE = `DELETE FROM cheeses WHERE cheese.cheese_id=${cheese_id}`;
    db.query(REMOVE_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed Cheese    ID: ${cheese_id}`);
        }
    });
});

//Get cheese by name
app.get('/cheeses/name', (req, res) => {
    const {name} = req.query;
    const CHEESE_BY_NAME = `SELECT * FROM cheeses WHERE name = '${name}'`;
    db.query(CHEESE_BY_NAME, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

//All Cheeses
app.get('/cheeses', (req, res) => {
    db.query(SELECT_ALL_CHEESES, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});




app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});