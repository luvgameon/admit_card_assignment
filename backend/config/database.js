const Sequelize = require('sequelize');
require('dotenv').config();

const data_base = new Sequelize(process.env.Dbname, process.env.DB_connection_user, process.env.Password, {
    dialect: 'mysql',
    host: process.env.Host 
  });
  
module.exports = data_base;