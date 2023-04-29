const express=require('express');
const msql=require('mysql2');
const app = express();
const dotenv = require('dotenv');
const body_parser=require('body-parser');
app.use(body_parser.json());
dotenv.config();
const data_base=require('./config/database');
const formrouter=require('./routes/formRoute');
const cors=require('cors');
app.use(cors());


app.use('/api',formrouter);

data_base.sync().then(()=>{
    app.listen(process.env.PORT || 5000);
    console.log('Running');
}).catch(err=> console.log(err))







