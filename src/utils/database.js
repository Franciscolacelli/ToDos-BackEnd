const { Sequelize} = require("sequelize");


const db = new Sequelize({
    host: "localhost",
    database: "entregable_2",
    port: 5432,
    username: "postgres",
    password: "Fran36442",
    dialect: "postgres"
});

module.exports = db;