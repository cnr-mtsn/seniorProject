const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize("F19fedres2", "cnr.mtsn", "d83f4eame4cumd", {
	host: "localhost",
    dialect: "mysql",
    port:3306,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;