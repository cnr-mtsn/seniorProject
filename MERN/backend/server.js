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
const SELECT_ALL_PROTEINS = 'SELECT * FROM proteins';
const SELECT_ALL_BREADS = 'SELECT * FROM sandwichBase';
const SELECT_ALL_TORTILLAS = 'SELECT * FROM tortillaBase';
const SELECT_ALL_VEGGIES = 'SELECT * FROM veggies';
// const SELECT_USER_PASSWORDS = `SELECT user_id FROM users WHERE name = '${name}' AND email = '${email}' AND pass = AES_ENCRYPT('${pass}', UNHEX(SHA2(CONCAT('${pass}', salt), 512)))`;





                    /**********   GET ROUTES   ************/
//Home Route
app.get('/', (req, res) => {
    res.send(`Go to /cheese to see cheeses`);
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
            return res.send(`Successfully Added {name} Price: ${price}`);
        }
    });
});
//Delete Cheese
app.get('/cheese/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_CHEESE = `DELETE FROM cheese WHERE name='${name}'`;
    db.query(REMOVE_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed ${name}`);
        }
    });
});
//Update Cheese
app.get('/cheese/update', (req, res) => {
    const {name, newName, newPrice} = req.query;
    const UPDATE_CHEESE = `UPDATE cheese SET name='${newName}', price=${newPrice} WHERE name='${name}'`;
    db.query(UPDATE_CHEESE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Updated ${name} to ${newName}`);
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
//Update Cheese

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
            return res.send(`Successfully Added ${name} Price: ${price}`);
        }
    });
});
//Delete Veggie
app.get('/veggie/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_VEGGIE = `DELETE FROM veggies WHERE name='${name}'`;
    db.query(REMOVE_VEGGIE, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed ${name}`);
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
        /************   BREADS ROUTES   ************/
//Add bread
app.get('/bread/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_BREAD = `INSERT INTO sandwichBase(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_BREAD, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added ${name} Price: ${price}`);
        }
    });
});
//Delete Bread
app.get('/bread/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_BREAD = `DELETE FROM sandwichBase WHERE name='${name}'`;
    db.query(REMOVE_BREAD, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return console.log(`Successfully Removed ${name}`);
        }
    });
});
//All Breads
app.get('/bread', (req, res) => {
    db.query(SELECT_ALL_BREADS, (err, results) => {
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
//Update Bread

        /************   PROTEIN ROUTES   ************/
//Add protein
app.get('/protein/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_PROTEIN = `INSERT INTO proteins(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_PROTEIN, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added ${name} Price: ${price}`);
        }
    });
});
//Delete protein
app.get('/protein/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_PROTEIN = `DELETE FROM proteins WHERE name='${name}'`;
    db.query(REMOVE_PROTEIN, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed ${name}`);
        }
    });
});
//All proteins
app.get('/protein', (req, res) => {
    db.query(SELECT_ALL_PROTEINS, (err, results) => {
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
        /************   CONDIMENTS ROUTES   ************/
//Add condiment
app.get('/condiment/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_CONDIMENT = `INSERT INTO condiments(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_CONDIMENT, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added ${name} Price: ${price}`);
        }
    });
});
//Delete condiment
app.get('/condiment/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_CONDIMENT = `DELETE FROM condiments WHERE name='${name}'`;
    db.query(REMOVE_CONDIMENT, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed ${name}`);
        }
    });
});
//All Condiments
app.get('/condiment', (req, res) => {
    db.query(SELECT_ALL_CONDIMENTS, (err, results) => {
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
        /************   EXTRAS ROUTES   ************/
//Add extra
app.get('/extra/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_EXTRA = `INSERT INTO extras(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_EXTRA, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added ${name} Price: ${price}`);
        }
    });
});
//Delete extra
app.get('/extra/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_EXTRA = `DELETE FROM extras WHERE name='${name}'`;
    db.query(REMOVE_EXTRA, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed ${name}`);
        }
    });
});
//All extras
app.get('/extra', (req, res) => {
    db.query(SELECT_ALL_EXTRAS, (err, results) => {
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
        /************   TORTILLAS ROUTES   ************/
//Add tortilla
app.get('/tortilla/add', (req, res) => {
    const {name, price} = req.query;
    const ADD_TORTILLA = `INSERT INTO tortillaBase(name, price) VALUES('${name}', ${price})`;
    db.query(ADD_TORTILLA, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added ${name} Price: ${price}`);
        }
    });
});
//Delete tortillla
app.get('/tortilla/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_TORTILLA = `DELETE FROM tortillaBase WHERE name='${name}'`;
    db.query(REMOVE_TORTILLA, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed ${name}`);
        }
    });
});
//All Tortillas
app.get('/tortilla', (req, res) => {
    db.query(SELECT_ALL_TORTILLAS, (err, results) => {
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

app.get('/userPassword', (req, res) => {
    db.query(SELECT_USER_PASSWORDS, (err, results) => {
        if (err) { 
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