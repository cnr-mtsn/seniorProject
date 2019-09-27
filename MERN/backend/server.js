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
const SELECT_ALL_USERS = 'SELECT * FROM user';



//GET ROUTES

//Home Route
app.get('/', (req, res) => {
    res.send(`Go to /users to see users`);
});

//Add User
app.get('/users/add', (req, res) => {
    const {firstName, lastName, email} = req.query;
    const ADD_USER = `INSERT INTO user(firstName, lastName, email) VALUES('${firstName}', '${lastName}', '${email}')`;
    db.query(ADD_USER, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Added User    First Name: ${firstName} LastName: ${lastName} Email: ${email}`);
        }
    });
});

//Delete User
app.get('/users/delete', (req, res) => {
    const {email} = req.query;
    const REMOVE_USER = `DELETE FROM user WHERE user.email='${email}'`;
    db.query(REMOVE_USER, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.send(`Successfully Removed User    Email: ${email}`);
        }
    });
});

//Get user by lastName
app.get('/users/firstName', (req, res) => {
    const {firstName} = req.query;
    const USER_BY_FIRST = `SELECT * FROM user WHERE firstName = '${firstName}'`;
    db.query(USER_BY_FIRST, (err, results) => {
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

//All Users
app.get('/users', (req, res) => {
    db.query(SELECT_ALL_USERS, (err, results) => {
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