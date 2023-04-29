const Sequelize=require('sequelize');
 
const data_base=require('../config/database');

const Form=data_base.define('form',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
      
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
      
    },
    mobileNo:{
        type:Sequelize.STRING,
        allowNull:false
      
    },
    school:{
        type:Sequelize.STRING,
        allowNull:false
      
    },
    myclass:{
        type:Sequelize.INTEGER,
        allowNull:false
        
    },
    rollno:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
        
    }
   

});
module.exports = Form;