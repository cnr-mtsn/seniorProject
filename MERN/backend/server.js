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
app.get('/cheese/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_CHEESE = `INSERT INTO cheese(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added Cheese    Name: ${name} Price: ${price}`);
        }
    });
});
//Delete Cheese
app.get('/cheese/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_CHEESE = `DELETE FROM cheese WHERE cheese.name=${name}`;
    db.query(REMOVE_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed Cheese    Name: ${name}`);
        }
    });
});
//All Cheeses
app.get('/cheese', (req, res) => {
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
app.get('/veggie/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_VEGGIE = `INSERT INTO veggies(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_VEGGIE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added Veggie    Name: ${name} Price: ${price}`);
        }
    });
});
//Delete Veggie
app.get('/veggie/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_VEGGIE = `DELETE FROM veggies WHERE veggies.name=${name}`;
    db.query(REMOVE_VEGGIE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed Veggie    Name: ${name}`);
        }
    });
});
//All Veggies
app.get('/veggie', (req, res) => {
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