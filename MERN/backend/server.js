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


/************   QUERIES   ************/
const SELECT_ALL_CHEESES = 'SELECT * FROM cheese';
const SELECT_ALL_CONDIMENTS = 'SELECT * FROM condiments';
const SELECT_ALL_EXTRAS = 'SELECT * FROM extras';
const SELECT_ALL_PROTEINS = 'SELECT * FROM protein';
const SELECT_ALL_BREADS = 'SELECT * FROM sandwichBase';
const SELECT_ALL_TORTILLAS = 'SELECT * FROM tortillaBase';
const SELECT_ALL_VEGGIES = 'SELECT * FROM veggies';





/**********   GET ROUTES   ************/
//Home Route
app.get('/', (req, res) => {
    res.send(`Go to /cheeses to see cheeses`);
});

/************   CHEESE ROUTES   ************/
//Add cheese
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
    const REMOVE_CHEESE = `DELETE FROM cheese WHERE cheese.cheese_id=${cheese_id}`;
    db.query(REMOVE_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed Cheese    ID: ${cheese_id}`);
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
/************   VEGGIES ROUTES   ************/
//Add veggie
app.get('/veggies/add', (req, res) => {
    const {veggie_id, name, price} = req.query;
    const ADD_VEGGIE = `INSERT INTO veggies(veggie_id, name, price) VALUES(${veggie_id}, '${name}', ${price})`;
    db.query(ADD_VEGGIE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added Veggie    ID: ${veggie_id} Name: ${name} Price: ${price}`);
        }
    });
});
//Delete Veggie
app.get('/veggies/delete', (req, res) => {
    const {veggie_id} = req.query;
    const REMOVE_VEGGIE = `DELETE FROM veggies WHERE veggies.veggie_id=${veggie_id}`;
    db.query(REMOVE_VEGGIE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed Veggie    ID: ${veggie_id}`);
        }
    });
});
//All Veggies
app.get('/veggies', (req, res) => {
    db.query(SELECT_ALL_VEGGIES, (err, results) => {
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






//Listen for requests on given port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});