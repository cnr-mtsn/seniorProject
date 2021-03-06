const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const PORT = 5000;
const bodyParser = require('body-parser');
const app = express();
const host = 'www.math-cs.ucmo.edu';
const user = 'F19fedres2';

app.use(cors());

//DATABASE CONNECTION
const db = mysql.createConnection( {
    host: host,
    user: user, 
    password: 'F19pw$', 
    database: 'F19fedres2'
});

db.connect((err) => {
    err ? console.log(`ERROR: ${err}`) : console.log(`Connected to MySQL: { host: ${host}, user: ${user}`);
})

//Listen for requests on given port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

/************   QUERIES   ************/
const SELECT_ALL_CHEESES = 'SELECT * FROM cheese';
const SELECT_ALL_CONDIMENTS = 'SELECT * FROM condiments';
const SELECT_ALL_EXTRAS = 'SELECT * FROM extras';
const SELECT_ALL_PROTEINS = 'SELECT * FROM proteins';
const SELECT_ALL_BREADS = 'SELECT * FROM sandwichBase';
const SELECT_ALL_TORTILLAS = 'SELECT * FROM tortillaBase';
const SELECT_ALL_VEGGIES = 'SELECT * FROM veggies';
const SELECT_ALL_TIMES = 'SELECT * FROM pickupTimes';
const SELECT_ALL_SPECIALS = 'SELECT * FROM main ORDER BY main_id';
// const SELECT_USER_PASSWORDS = `SELECT user_id FROM users WHERE name = '${name}' AND email = '${email}' AND pass = AES_ENCRYPT('${pass}', UNHEX(SHA2(CONCAT('${pass}', salt), 512)))`;


/**********   GET ROUTES   ************/
//Home Route
app.get('/', (req, res) => {
    res.send(`Home`);
});
//Login User
app.get('/user/login', (req, res) => {
    const {user} = req.query;
    const FIND_USER = `SELECT * FROM users WHERE user_id = ${user}`;
    db.query(FIND_USER, (err, results) => {
        err ? res.send(err) : res.json({ data: results});
    });
});

/************   CHEESE ROUTES   ************/
//Add cheese
app.get('/cheese/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_CHEESE = `INSERT INTO cheese(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_CHEESE, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete Cheese
app.get('/cheese/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_CHEESE = `DELETE FROM cheese WHERE name='${name}'`;
    db.query(REMOVE_CHEESE, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All Cheeses
app.get('/cheese', (req, res) => {
    db.query(SELECT_ALL_CHEESES, (err, results) => {
       err ? res.send(err) : res.json({ data: results });
    });
});
//Update Cheese
app.get('/cheese/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_CHEESE = `UPDATE cheese SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_CHEESE, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});


/************   VEGGIES ROUTES   ************/
//Add veggie
app.get('/veggie/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_VEGGIE = `INSERT INTO veggies(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_VEGGIE, (err, results) => {
       err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete Veggie
app.get('/veggie/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_VEGGIE = `DELETE FROM veggies WHERE name='${name}'`;
    db.query(REMOVE_VEGGIE, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All Veggies
app.get('/veggie', (req, res) => {
    db.query(SELECT_ALL_VEGGIES, (err, results) => {
       err ? res.send(err) : res.json({ data: results });
    });
});
//Update Veggie
app.get('/veggie/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_VEGGIE = `UPDATE veggies SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_VEGGIE, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});

/************   BREADS ROUTES   ************/
//Add bread
app.get('/bread/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_BREAD = `INSERT INTO sandwichBase(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_BREAD, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete Bread
app.get('/bread/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_BREAD = `DELETE FROM sandwichBase WHERE name='${name}'`;
    db.query(REMOVE_BREAD, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All Breads
app.get('/bread', (req, res) => {
    db.query(SELECT_ALL_BREADS, (err, results) => {
        err ? res.send(err) : res.json({ data: results});
    });
});
//Update Bread
app.get('/bread/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_BREAD = `UPDATE sandwichBase SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_BREAD, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});

/************   PROTEIN ROUTES   ************/
//Add protein
app.get('/protein/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_PROTEIN = `INSERT INTO proteins(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_PROTEIN, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete protein
app.get('/protein/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_PROTEIN = `DELETE FROM proteins WHERE name='${name}'`;
    db.query(REMOVE_PROTEIN, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All proteins
app.get('/protein', (req, res) => {
    db.query(SELECT_ALL_PROTEINS, (err, results) => {
        err ? res.send(err) : res.json({ data: results });
    });
});
//Update Protein
app.get('/protein/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_PROTEIN = `UPDATE proteins SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_PROTEIN, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});

/************   CONDIMENTS ROUTES   ************/
//Add condiment
app.get('/condiment/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_CONDIMENT = `INSERT INTO condiments(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_CONDIMENT, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete condiment
app.get('/condiment/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_CONDIMENT = `DELETE FROM condiments WHERE name='${name}'`;
    db.query(REMOVE_CONDIMENT, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All Condiments
app.get('/condiment', (req, res) => {
    db.query(SELECT_ALL_CONDIMENTS, (err, results) => {
      err ? res.send(err) : res.json({ data: results });
    });
});
//Update Condiment
app.get('/condiment/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_CONDIMENT = `UPDATE condiments SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_CONDIMENT, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});

/************   EXTRAS ROUTES   ************/
//Add extra
app.get('/extra/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_EXTRA = `INSERT INTO extras(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_EXTRA, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete extra
app.get('/extra/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_EXTRA = `DELETE FROM extras WHERE name='${name}'`;
    db.query(REMOVE_EXTRA, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All extras
app.get('/extra', (req, res) => {
    db.query(SELECT_ALL_EXTRAS, (err, results) => {
       err ? res.send(err) : res.json({ data: results });
    });
});
//Update Extra
app.get('/extra/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_EXTRA = `UPDATE extras SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_EXTRA, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});

/************   TORTILLAS ROUTES   ************/
//Add tortilla
app.get('/tortilla/add', (req, res) => {
    const {name, price, healthPoints, newCals} = req.query;
    const ADD_TORTILLA = `INSERT INTO tortillaBase(name, price, health_points, calories) VALUES('${name}', ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_TORTILLA, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Added ${name} Price: ${price}`);
    });
});
//Delete tortillla
app.get('/tortilla/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_TORTILLA = `DELETE FROM tortillaBase WHERE name='${name}'`;
    db.query(REMOVE_TORTILLA, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//All Tortillas
app.get('/tortilla', (req, res) => {
    db.query(SELECT_ALL_TORTILLAS, (err, results) => {
        err ? res.send(err) : res.json({ data: results });
    });
});
//Update Tortilla
app.get('/tortilla/update', (req, res) => {
    const {name, newName, newPrice, newHP, newCals} = req.query;
    const UPDATE_TORTILLA = `UPDATE tortillaBase SET name='${newName}', price=${newPrice}, health_points=${newHP}, calories=${newCals} WHERE name='${name}'`;
    db.query(UPDATE_TORTILLA, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Updated ${name} to ${newName}`);
    });
});

//All Pickup Times
app.get('/pickupTimes', (req, res) => {
    db.query(SELECT_ALL_TIMES, (err, results) => {
        err ? res.send(err) : res.json({ data: results });
    });
});

/**** SPECIALS ROUTES ************/
//All Deli Specials
app.get('/specials', (req, res) => {
    db.query(SELECT_ALL_SPECIALS, (err, results) => {
        err ? res.send(err) : res.json({ data: results});
    });
});
//add Special
app.get('/specials/add', (req, res) => {
    const {name, desc, price, healthPoints, newCals} = req.query;
    const ADD_SPECIAL = `INSERT INTO main(name, description, price, health_points, calories) VALUES('${name}', ${desc}, ${price}, ${healthPoints}, ${newCals})`;
    db.query(ADD_SPECIAL, (err, results) => {
        err ? res.send(err) : res.send(`Successfully added ${name}`);
    });
});
//DELETE Special
app.get('/specials/delete', (req, res) => {
    const {name} = req.query;
    const REMOVE_SPECIAL = `DELETE FROM main WHERE name='${name}'`;
    db.query(REMOVE_SPECIAL, (err, results) => {
        err ? res.send(err) : res.send(`Successfully Removed ${name}`);
    });
});
//UPDATE Special
app.get('/specials/update', (req, res) => {
    const {name, newName, price, hp, desc, newCals} = req.query;
    const UPDATE_SPECIAL = `UPDATE main SET name='${newName}', price=${price}, health_points=${hp}, calories=${newCals}, description='${desc}' WHERE name='${name}'`;
    db.query(UPDATE_SPECIAL, (err, results) => {
        err ? res.send(err) : res.send(`Successfully updated ${name} to ${newName}`);
    });
});

app.get('/userStats', (req, res) => {
    const {userID} = req.query;
    const SELECT_USER_STATS = `
        SELECT
            name,
            total_spent,
            total_health_points
        FROM users 
        WHERE user_id = '${userID}'`;
    db.query(SELECT_USER_STATS, (err, results) => {
        err ? res.send(err) : res.json({ data: results })
    });
});
app.get('/userById', (req, res) => {
    const {id} = req.query;
    const GET_USER_VIEW = `SELECT firstName, lastName, user_id, view FROM users WHERE user_id = ${id} LIMIT 1`;
    db.query(GET_USER_VIEW, (err, results) => {
        err ? res.send(err) : res.json({data:results})
    });
});
app.get('/userByIdAll', (req, res) => {
    const {id} = req.query;
    const GET_USER_VIEW = `SELECT * FROM users WHERE user_id = ${id} LIMIT 1`;
    db.query(GET_USER_VIEW, (err, results) => {
        err ? res.send(err) : res.json({data:results})
    });
});
app.get('/userHP', (req, res) => {
    const {id} = req.query;
    const GET_TOTAL_HP = `SELECT SUM(hp) as sum FROM orders WHERE user_id = ${id}`;
    db.query(GET_TOTAL_HP, (err, results) => {
        err ? res.send(err) : res.json({ data: results })
    });
});

/************ ORDERS ************/
//Add order
app.get('/newOrder', (req, res) => {
    const {userId, orderId, total, hp, comments, pickupTime} = req.query;
    const ADD_ORDER = `INSERT INTO orders(user_id, order_id, total, hp, comments, pickupTime) VALUES(${userId}, ${orderId}, ${total}, ${hp}, '${comments}', '${pickupTime}')`;
    db.query(ADD_ORDER, (err, results) => {
        err ? res.send(err) : res.json({ data: results });
    });
});
//all orders by user_ID
app.get('/ordersById', (req, res) => {
    const {userId} = req.query;
    const GET_ORDERS_BY_ID = `SELECT hp, order_id, user_id, total, DATE_FORMAT(order_date, '%m-%d-%Y') as order_date FROM orders WHERE user_id = ${userId}`;
    db.query(GET_ORDERS_BY_ID, (err, results) => {
        err ? res.send(err) : res.json({ data: results });
    });
});
//maxOrderByUserID
app.get('/maxOrderById', (req, res) => {
    const GET_MAX_ID = `SELECT MAX(order_id) as id FROM orders`;
    db.query(GET_MAX_ID, (err, results) => {
        err ? res.send(err) : res.json({ data: results });
    });
});
//insert order item
app.get('/insertOrderItem', (req, res) => {
    const {itemId, attr, table, orderId} = req.query;
    const INSERT_ORDER_ITEM = `INSERT INTO ${table}(order_id, ${attr}) VALUES(${orderId}, ${itemId})`;
    db.query(INSERT_ORDER_ITEM, (err, results) => {
        err ? res.send(err) : res.json({ data : results });
    });
});
//get name, price, health_points of each item in order
app.get('/getItemNames', (req, res) => {
    const {orderId, category, orders_category} = req.query;
    const GET_ITEM_NAME = `SELECT name FROM ${category} NATURAL LEFT OUTER JOIN ${orders_category} where ${orders_category}.order_id=${orderId}`;
    db.query(GET_ITEM_NAME, (err, results) => {
        err ? res.send(err) : res.json( {data: results });
    });
});
//get all orders
app.get('/allOrders', (req, res) => {
    const GET_ALL_ORDERS = `SELECT * FROM orders WHERE pickupTime > TIME_FORMAT(CURRENT_TIME(), "%h %i %s") ORDER BY pickupTime`;
    db.query(GET_ALL_ORDERS, (err, results) => {
        err ? res.send(err) : res.json( { data: results });
    });
});

//mark order completed
app.get('/orderComplete', (req, res) => {
    const {id} = req.query;
    const SET_COMPLETE = `UPDATE orders SET complete = 1 WHERE order_id = ${id}`;
    db.query(SET_COMPLETE, (err, results) => {
        err ? res.send(err) : res.json( {data: results });
    });
});
